// 나의 라이프 대시보드 - 브라우저에서 실행하는 JavaScript

const STORAGE_KEYS = {
    tasks: "lifeDashboard.tasks",
    memo: "lifeDashboard.memo"
};

let tasks = loadTasks();
let currentFilter = "all";
let memoTimer = null;

// HTML 요소 찾기
const todayDate = document.querySelector("#todayDate");
const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const emptyMessage = document.querySelector("#emptyMessage");
const totalCount = document.querySelector("#totalCount");
const doneCount = document.querySelector("#doneCount");
const progressText = document.querySelector("#progressText");
const progressFill = document.querySelector("#progressFill");
const progressBar = document.querySelector("#progressBar");
const memoInput = document.querySelector("#memoInput");
const memoStatus = document.querySelector("#memoStatus");

// 시작할 때 화면에 날짜, 저장된 할 일, 메모 표시
showToday();
memoInput.value = localStorage.getItem(STORAGE_KEYS.memo) || "";
renderTasks();

// 오늘 날짜 표시
function showToday() {
    const now = new Date();
    todayDate.textContent = new Intl.DateTimeFormat("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
    }).format(now);
}

// 저장된 할 일 불러오기
function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.tasks) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        console.error("저장된 할 일을 읽지 못했습니다.", error);
        return [];
    }
}

// 할 일 배열을 브라우저 저장 공간에 저장
function saveTasks() {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
}

// 새 할 일 등록
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (title === "") {
        alert("할 일을 입력해 주세요.");
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now(),
        title: title,
        done: false
    });

    saveTasks();
    renderTasks();
    taskForm.reset();
    taskInput.focus();
});

// 할 일 목록을 화면에 다시 그리기
function renderTasks() {
    taskList.replaceChildren();

    const visibleTasks = tasks.filter(function (task) {
        if (currentFilter === "active") return !task.done;
        if (currentFilter === "done") return task.done;
        return true;
    });

    visibleTasks.forEach(function (task) {
        const item = document.createElement("li");
        item.className = task.done ? "task-item completed" : "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-check";
        checkbox.checked = task.done;
        checkbox.setAttribute("aria-label", task.title + " 완료 여부");
        checkbox.addEventListener("change", function () {
            toggleTask(task.id);
        });

        const title = document.createElement("span");
        title.className = "task-title";
        title.textContent = task.title;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.textContent = "삭제";
        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        item.append(checkbox, title, deleteButton);
        taskList.append(item);
    });

    emptyMessage.hidden = visibleTasks.length > 0;
    updateSummary();
}

// 완료 상태 바꾸기
function toggleTask(taskId) {
    tasks = tasks.map(function (task) {
        if (task.id === taskId) {
            return { ...task, done: !task.done };
        }
        return task;
    });

    saveTasks();
    renderTasks();
}

// 할 일 삭제하기
function deleteTask(taskId) {
    tasks = tasks.filter(function (task) {
        return task.id !== taskId;
    });

    saveTasks();
    renderTasks();
}

// 전체 개수, 완료 개수, 완료율 계산
function updateSummary() {
    const total = tasks.length;
    const done = tasks.filter(function (task) {
        return task.done;
    }).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    totalCount.textContent = total;
    doneCount.textContent = done;
    progressText.textContent = percent + "%";
    progressFill.style.width = percent + "%";
    progressBar.setAttribute("aria-valuenow", percent);
}

// 전체 / 진행 중 / 완료 필터 버튼
document.querySelectorAll(".filter-button").forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.dataset.filter;

        document.querySelectorAll(".filter-button").forEach(function (filterButton) {
            filterButton.classList.toggle("active", filterButton === button);
        });

        renderTasks();
    });
});

// 메모 자동 저장: 입력이 잠시 멈추면 저장
memoInput.addEventListener("input", function () {
    memoStatus.textContent = "저장하는 중...";
    clearTimeout(memoTimer);

    memoTimer = setTimeout(function () {
        localStorage.setItem(STORAGE_KEYS.memo, memoInput.value);
        memoStatus.textContent = "저장했어요.";
    }, 400);
});
