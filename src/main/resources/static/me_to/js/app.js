const addButton = document.querySelector("#addButton");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");
const filterButtons = document.querySelectorAll(".filter-btn");

// 할 일마다 순서대로 적용할 배경색 목록
const colors = ["#fef3c7", "#dcfce7", "#e0e7ff", "#fce7f3", "#f1f5f9"];
let colorIndex = 0;
let currentFilter = "all"; // 현재 선택된 필터 상태 ("all", "active", "completed")

// [추가 기능 1] 선택된 탭(전체/진행중/완료)에 따라 항목을 보이거나 숨기는 함수
function applyFilter() {
  const items = taskList.querySelectorAll("li");

  items.forEach(function(item) {
    const taskText = item.querySelector("span");
    if (!taskText) return; // 수정 중일 때는 건너뜀

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

// 남은 할 일 개수를 계산해서 화면에 표시하는 함수
function updateCount() {
  const items = taskList.querySelectorAll("li");
  let remaining = 0;

  items.forEach(function(item) {
    const taskText = item.querySelector("span");
    if (taskText && taskText.style.textDecoration !== "line-through") {
      remaining++;
    }
  });

  taskCount.textContent = "남은 할 일: " + remaining + "개 (전체 " + items.length + "개)";
}

// 현재 화면의 할 일 목록을 localStorage에 저장하는 함수
function saveTasks() {
  const tasks = [];
  const items = taskList.querySelectorAll("li");

  items.forEach(function(item) {
    const taskText = item.querySelector("span");
    if (taskText) {
      tasks.push({
        text: taskText.textContent,
        completed: taskText.style.textDecoration === "line-through",
        bgColor: item.style.backgroundColor
      });
    }
  });

  localStorage.setItem("myTodoList", JSON.stringify(tasks));
  updateCount();
  applyFilter(); // 상태가 바뀔 때마다 현재 필터 조건 다시 적용
}

// 화면에 할 일 항목(li) 하나를 생성해 붙이는 공통 함수
function createTaskElement(text, isCompleted, bgColor) {
  const item = document.createElement("li");
  item.style.backgroundColor = bgColor;

  const taskText = document.createElement("span");
  taskText.textContent = text;
  if (isCompleted) {
    taskText.style.textDecoration = "line-through";
  }

  // 한 번 클릭 시 취소선 토글 (더블클릭과 충돌하지 않도록 타이머 사용)
  let clickTimer = null;
  taskText.addEventListener("click", function() {
    clearTimeout(clickTimer);
    clickTimer = setTimeout(function() {
      if (taskText.style.textDecoration === "line-through") {
        taskText.style.textDecoration = "none";
      } else {
        taskText.style.textDecoration = "line-through";
      }
      saveTasks();
    }, 200);
  });

  // [추가 기능 2] 더블클릭 시 내용을 고치는 수정 모드 전환
  taskText.addEventListener("dblclick", function() {
    clearTimeout(clickTimer); // 한 번 클릭 이벤트 취소

    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = taskText.textContent;
    editInput.className = "edit-input";

    // 기존 글자(span) 자리에 수정 입력창 넣기
    item.replaceChild(editInput, taskText);
    editInput.focus();

    // 수정 완료 처리 함수
    function finishEdit() {
      const newText = editInput.value.trim();
      if (newText !== "") {
        taskText.textContent = newText;
      }
      // 입력창을 다시 글자(span)로 되돌리기
      if (item.contains(editInput)) {
        item.replaceChild(taskText, editInput);
        saveTasks();
      }
    }

    // 엔터 키를 누르거나 입력창 바깥을 클릭하면 수정 저장
    editInput.addEventListener("keydown", function(event) {
      if (event.isComposing) return;
      if (event.key === "Enter") {
        finishEdit();
      } else if (event.key === "Escape") {
        // ESC 키를 누르면 수정 취소
        item.replaceChild(taskText, editInput);
      }
    });

    editInput.addEventListener("blur", finishEdit);
  });

  // 개별 삭제 버튼
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";
  deleteButton.className = "delete-btn";
  deleteButton.addEventListener("click", function() {
    item.remove();
    saveTasks();
  });

  item.append(taskText, deleteButton);
  taskList.append(item);
}

// 페이지가 열릴 때 저장된 목록을 불러오는 함수
function loadTasks() {
  const saved = localStorage.getItem("myTodoList");
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(function(task) {
      createTaskElement(task.text, task.completed, task.bgColor);
    });
    colorIndex = tasks.length % colors.length;
  }
  updateCount();
  applyFilter();
}

// 새로운 할 일 추가 함수
function addTask() {
  if (input.value.trim() === "") {
    alert("할 일을 입력해 주세요!");
    return;
  }

  const currentColor = colors[colorIndex];
  colorIndex = (colorIndex + 1) % colors.length;

  createTaskElement(input.value, false, currentColor);
  saveTasks();
  input.value = "";
}

// 1. 추가 버튼 및 엔터 키 이벤트
addButton.addEventListener("click", addTask);
input.addEventListener("keydown", function(event) {
  if (event.isComposing) return;
  if (event.key === "Enter") {
    addTask();
  }
});

// 2. 필터 탭 버튼 클릭 이벤트
filterButtons.forEach(function(btn) {
  btn.addEventListener("click", function() {
    // 모든 탭에서 active 클래스 제거 후 클릭한 탭에만 추가
    filterButtons.forEach(function(b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    applyFilter();
  });
});

// 3. 완료 항목만 삭제 버튼
clearCompletedBtn.addEventListener("click", function() {
  const items = taskList.querySelectorAll("li");
  items.forEach(function(item) {
    const taskText = item.querySelector("span");
    if (taskText && taskText.style.textDecoration === "line-through") {
      item.remove();
    }
  });
  saveTasks();
});

// 4. 전체 삭제 버튼
clearAllBtn.addEventListener("click", function() {
  if (taskList.children.length === 0) return;

  if (confirm("할 일 목록을 모두 삭제할까요?")) {
    taskList.innerHTML = "";
    colorIndex = 0;
    saveTasks();
  }
});

// 시작 시 데이터 불러오기
loadTasks();
