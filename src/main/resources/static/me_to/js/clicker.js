let score = 0;

const scoreElement = document.querySelector("#score");
const clickButton = document.querySelector("#clickButton");
const resetButton = document.querySelector("#resetButton");
const messageElement = document.querySelector("#message");

function addScore() {
  score = score + 1;
  scoreElement.textContent = score;

  if (score === 10) {
    messageElement.textContent = "10점 달성!";
    messageElement.classList.add("success"); // 초록색 클래스 추가
  } else {
    messageElement.textContent = "좋아요! 한 점을 얻었습니다.";
    messageElement.classList.remove("success"); // 초록색 클래스 제거
  }
}

function resetGame() {
  score = 0;
  scoreElement.textContent = score;
  messageElement.textContent = "점수가 초기화되었습니다.";
  messageElement.classList.remove("success"); // 초기화 시 원래 색상으로 복구
}

clickButton.addEventListener("click", addScore);
resetButton.addEventListener("click", resetGame);
