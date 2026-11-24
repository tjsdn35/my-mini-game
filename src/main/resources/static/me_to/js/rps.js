// 1. HTML 요소 찾기
const scissorsBtn = document.querySelector("#scissorsBtn");
const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");

const computerChoiceText = document.querySelector("#computerChoice");
const resultText = document.querySelector("#resultText");
const scoreText = document.querySelector("#score");

// 2. 게임 상태 변수 및 데이터
let score = 0;
const choices = ["가위", "바위", "보"];

// 3. 게임 실행 함수
function playGame(userChoice) {
  // 0, 1, 2 중 무작위 숫자 뽑기
  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = choices[randomIndex];

  // 컴퓨터 선택 화면에 표시
  computerChoiceText.textContent = computerChoice;

  // 승패 판정
  if (userChoice === computerChoice) {
    resultText.textContent = "비겼습니다!";
  } else if (
    (userChoice === "가위" && computerChoice === "보") ||
    (userChoice === "바위" && computerChoice === "가위") ||
    (userChoice === "보" && computerChoice === "바위")
  ) {
    resultText.textContent = "이겼습니다! (+10점)";
    score = score + 10;
    scoreText.textContent = score;
  } else {
    resultText.textContent = "졌습니다!";
  }
}

// 4. 버튼 클릭 이벤트 연결
scissorsBtn.addEventListener("click", function() {
  playGame("가위");
});
rockBtn.addEventListener("click", function() {
  playGame("바위");
});
paperBtn.addEventListener("click", function() {
  playGame("보");
});
