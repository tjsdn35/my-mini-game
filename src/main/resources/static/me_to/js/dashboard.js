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

// 3. 할 일 목록 관리 (배열 + localStorage + 완료율 계산)
const todoForm = document.querySelector("#todoForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const progressPercent = document.querySelector("#progressPercent");
const progressBar = document.querySelector("#progressBar");

let tasks = JSON.parse(localStorage.getItem("dashTasks") || "[]");

function saveAndRenderTasks() {
  localStorage.setItem("dashTasks", JSON.stringify(tasks));
  renderTasks();
  updateProgress();
}

function updateProgress() {
  if (tasks.length === 0) {
    progressPercent.textContent = "0%";
    progressBar.style.width = "0%";
    return;
  }
  const doneCount = tasks.filter((task) => task.done).length;
  const percent = Math.round((doneCount / tasks.length) * 100);
  progressPercent.textContent = percent + "%";
  progressBar.style.width = percent + "%";
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const label = document.createElement("label");
    label.className = task.done ? "task-label done" : "task-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = checkbox.checked;
      saveAndRenderTasks();
    });

    const span = document.createElement("span");
    span.textContent = task.title;

    label.append(checkbox, span);

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "del-btn";
    delBtn.textContent = "삭제";
    delBtn.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveAndRenderTasks();
    });

    li.append(label, delBtn);
    taskList.append(li);
  });
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
  const title = taskInput.value.trim();
  if (title === "") {
    alert("할 일을 입력해 주세요.");
    return;
  }

  tasks.push({
    id: Date.now(),
    title: title,
    done: false
  });

  taskInput.value = "";
  saveAndRenderTasks();
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

// 초기 화면 그리기
renderTasks();
updateProgress();
