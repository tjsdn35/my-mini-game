// 1. 오늘 날짜 표시
const todayDate = document.querySelector("#todayDate");
const now = new Date();
const days = ["일", "월", "화", "수", "목", "금", "토"];
todayDate.textContent = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 (${days[now.getDay()]}요일)`;

// 2. 오늘의 집중 목표 저장 및 불러오기
const focusInput = document.querySelector("#focusInput");
focusInput.value = localStorage.getItem("dashFocus") || "";
focusInput.addEventListener("input", () => {
  localStorage.setItem("dashFocus", focusInput.value);
});

// 3. 통합 할 일 목록 관리 (index.html의 myTodoList와 실시간 공유 + 완료율 게이지 연동)
const todoForm = document.querySelector("#todoForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");

const colors = ["#fef3c7", "#dcfce7", "#e0e7ff", "#fce7f3", "#f1f5f9"];
let colorIndex = 0;
let currentFilter = "all";

// 필터 적용 함수
function applyFilter() {
  const items = taskList.querySelectorAll("li");
  items.forEach((item) => {
    const taskText = item.querySelector("span");
    if (!taskText) return;

    const isCompleted = taskText.style.textDecoration === "line-through";
    if (currentFilter === "all") {
      item.style.display = "flex";
    } else if (currentFilter === "active") {
      item.style.display = isCompleted ? "none" : "flex";
    } else if (currentFilter === "completed") {
      item.style.display = isCompleted ? "flex" : "none";
    }
  });
}

// 남은 할 일 개수 및 완료율 프로그레스 바 동시 업데이트
function updateStats() {
  const items = taskList.querySelectorAll("li");
  const totalCount = items.length;
  let remaining = 0;

  items.forEach((item) => {
    const taskText = item.querySelector("span");
    if (taskText && taskText.style.textDecoration !== "line-through") {
      remaining++;
    }
  });

  const doneCount = totalCount - remaining;
  taskCount.textContent = `남은 할 일: ${remaining}개 (전체 ${totalCount}개)`;

  const percent = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);
  progressPercent.textContent = percent + "%";
  progressBar.style.width = percent + "%";
}

// localStorage("myTodoList")에 저장 (index.html과 동일한 키 사용)
function saveTasks() {
  const tasks = [];
  const items = taskList.querySelectorAll("li");

  items.forEach((item) => {
    const taskText = item.querySelector("span");
    if (taskText) {
      tasks.push({
        text: taskText.textContent,
        completed: taskText.style.textDecoration === "line-through",
        bgColor: item.style.backgroundColor || colors[0]
      });
    }
  });

  localStorage.setItem("myTodoList", JSON.stringify(tasks));
  updateStats();
  applyFilter();
}

// 할 일 항목(li) 생성 함수 (클릭 완료 + 더블클릭 수정 + 삭제)
function createTaskElement(text, isCompleted, bgColor) {
  const item = document.createElement("li");
  item.className = "task-item";
  item.style.backgroundColor = bgColor || colors[0];

  const taskText = document.createElement("span");
  taskText.textContent = text;
  if (isCompleted) {
    taskText.style.textDecoration = "line-through";
  }

  // 한 번 클릭: 완료 취소선 토글
  let clickTimer = null;
  taskText.addEventListener("click", () => {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      if (taskText.style.textDecoration === "line-through") {
        taskText.style.textDecoration = "none";
      } else {
        taskText.style.textDecoration = "line-through";
      }
      saveTasks();
    }, 200);
  });

  // 더블클릭: 내용 수정 모드
  taskText.addEventListener("dblclick", () => {
    clearTimeout(clickTimer);

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText.textContent;
    editInput.className = "edit-input";

    item.replaceChild(editInput, taskText);
    editInput.focus();

    function finishEdit() {
      const newText = editInput.value.trim();
      if (newText !== "") {
        taskText.textContent = newText;
      }
      if (item.contains(editInput)) {
        item.replaceChild(taskText, editInput);
        saveTasks();
      }
    }

    editInput.addEventListener("keydown", (event) => {
      if (event.isComposing) return;
      if (event.key === "Enter") {
        finishEdit();
      } else if (event.key === "Escape") {
        item.replaceChild(taskText, editInput);
      }
    });

    editInput.addEventListener("blur", finishEdit);
  });

  // 개별 삭제 버튼
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "삭제";
  deleteButton.className = "del-btn";
  deleteButton.addEventListener("click", () => {
    item.remove();
    saveTasks();
  });

  item.append(taskText, deleteButton);
  taskList.append(item);
}

// 초기 데이터 불러오기
function loadTasks() {
  const saved = localStorage.getItem("myTodoList");
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach((task) => {
      createTaskElement(task.text, task.completed, task.bgColor);
    });
    colorIndex = tasks.length % colors.length;
  }
  updateStats();
  applyFilter();
}

// 새 할 일 추가 (폼 제출)
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = taskInput.value.trim();
  if (title === "") {
    alert("할 일을 입력해 주세요.");
    return;
  }

  const currentColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;

  createTaskElement(title, false, currentColor);
  saveTasks();
  taskInput.value = "";
});

// 필터 탭 클릭 이벤트
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    applyFilter();
  });
});

// 완료 항목 삭제
clearCompletedBtn.addEventListener("click", () => {
  const items = taskList.querySelectorAll("li");
  items.forEach((item) => {
    const taskText = item.querySelector("span");
    if (taskText && taskText.style.textDecoration === "line-through") {
      item.remove();
    }
  });
  saveTasks();
});

// 전체 삭제
clearAllBtn.addEventListener("click", () => {
  if (taskList.children.length === 0) return;
  if (confirm("할 일 목록을 모두 삭제할까요?")) {
    taskList.innerHTML = "";
    colorIndex = 0;
    saveTasks();
  }
});

// 4. 메모 자동 저장 (디바운스 적용)
const memoInput = document.querySelector("#memoInput");
const memoStatus = document.querySelector("#memoStatus");
let memoTimer = null;

memoInput.value = localStorage.getItem("dashMemo") || "";

memoInput.addEventListener("input", () => {
  memoStatus.textContent = "저장 중...";
  clearTimeout(memoTimer);
  memoTimer = setTimeout(() => {
    localStorage.setItem("dashMemo", memoInput.value);
    memoStatus.textContent = "자동 저장됨";
  }, 400);
});

// 시작 시 데이터 로드
loadTasks();
