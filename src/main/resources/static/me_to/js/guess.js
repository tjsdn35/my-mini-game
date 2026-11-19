// 1. 랜덤 숫자 범위를 1~100으로 확장 (교재 37p 도전 미션)
let answer = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

const inputElement = document.querySelector("#numberInput");
const checkButton = document.querySelector("#checkButton");
const restartButton = document.querySelector("#restartButton");
const messageElement = document.querySelector("#message");

function checkGuess() {
  const guess = Number(inputElement.value);

  // 2. 입력 검증 범위를 1~100으로 확장
  if (inputElement.value === "" || guess < 1 || guess > 100) {
    messageElement.textContent = "1부터 100 사이의 숫자를 입력해 주세요.";
    messageElement.classList.remove("success");
    return;
  }

  attempts = attempts + 1;

  if (guess === answer) {
    messageElement.textContent = "정답입니다! 시도 횟수: " + attempts + "번";
    messageElement.classList.add("success"); // 정답일 때 초록색 강조
  } else if (guess < answer) {
    messageElement.textContent = "더 큰 숫자입니다.";
    messageElement.classList.remove("success");
  } else {
    messageElement.textContent = "더 작은 숫자입니다.";
    messageElement.classList.remove("success");
  }

  inputElement.value = "";
  inputElement.focus();
}

function restartGame() {
  // 새 게임 시작 시에도 1~100 범위로 새 숫자 생성
  answer = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  inputElement.value = "";
  messageElement.textContent = "새 숫자가 준비되었습니다! 1부터 100 사이 숫자를 입력하세요.";
  messageElement.classList.remove("success"); // 초록색 강조 해제
}

checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restartGame);
