// 1. HTML 요소 가져오기
const gameScreen = document.querySelector("#gameScreen");
const winScreen = document.querySelector("#winScreen");
const winSummary = document.querySelector("#winSummary");

const continueBtn = document.querySelector("#continueBtn");
const newGameBtn = document.querySelector("#newGameBtn");

const scissorsBtn = document.querySelector("#scissorsBtn");
const rockBtn = document.querySelector("#rockBtn");
const paperBtn = document.querySelector("#paperBtn");
const startBtn = document.querySelector("#startBtn");

const userHand = document.querySelector("#userHand");
const userChoiceName = document.querySelector("#userChoiceName");
const computerHand = document.querySelector("#computerHand");
const computerChoiceName = document.querySelector("#computerChoiceName");

const userWinsText = document.querySelector("#userWins");
const computerWinsText = document.querySelector("#computerWins");
const streakText = document.querySelector("#streak");
const scoreText = document.querySelector("#score");
const highScoreText = document.querySelector("#highScore");
const resultText = document.querySelector("#resultText");

// 2. 게임 상태 변수
let userWins = 0;
let computerWins = 0;
let streak = 0;
let score = 0;
let isRoundActive = false;
let spinTimer = null;
let spinIndex = 0;

// localStorage에서 최고 점수 불러오기
let highScore = Number(localStorage.getItem("rpsHighScore")) || 0;
highScoreText.textContent = highScore;

const choices = ["가위", "바위", "보"];
const handIcons = {
  "가위": "✌️",
  "바위": "✊",
  "보": "🖐️"
};

// 3. 도구 함수들
function setChoiceButtonsDisabled(disabled) {
  scissorsBtn.disabled = disabled;
  rockBtn.disabled = disabled;
  paperBtn.disabled = disabled;
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    highScoreText.textContent = highScore;
    localStorage.setItem("rpsHighScore", highScore);
  }
}

// 4. 컴퓨터 손 돌아가는 애니메이션 시작
function startSpinning() {
  // 패배 후 재도전인 경우 승수 초기화
  if (computerWins === 3) {
    userWins = 0;
    computerWins = 0;
    userWinsText.textContent = userWins;
    computerWinsText.textContent = computerWins;
  }

  isRoundActive = true;
  startBtn.disabled = true;
  setChoiceButtonsDisabled(false);

  userHand.textContent = "🤔";
  userChoiceName.textContent = "선택하세요!";
  computerChoiceName.textContent = "고르는 중...";
  resultText.textContent = "가위, 바위, 보 중 하나를 선택하세요!";
  resultText.style.color = "#18324b";

  spinTimer = setInterval(function () {
    const currentChoice = choices[spinIndex];
    computerHand.textContent = handIcons[currentChoice];
    spinIndex = (spinIndex + 1) % 3;
  }, 100);
}

// 5. 라운드 진행 및 승패 판정
function playRound(userChoice) {
  if (!isRoundActive) {
    return;
  }

  clearInterval(spinTimer);
  isRoundActive = false;
  setChoiceButtonsDisabled(true);

  const randomIndex = Math.floor(Math.random() * 3);
  const computerChoice = choices[randomIndex];

  userHand.textContent = handIcons[userChoice];
  userChoiceName.textContent = userChoice;
  computerHand.textContent = handIcons[computerChoice];
  computerChoiceName.textContent = computerChoice;

  if (userChoice === computerChoice) {
    resultText.textContent = "🤝 비겼습니다! 승수 변동 없음.";
    resultText.style.color = "#555555";
  } else if (
    (userChoice === "가위" && computerChoice === "보") ||
    (userChoice === "바위" && computerChoice === "가위") ||
    (userChoice === "보" && computerChoice === "바위")
  ) {
    // 라운드 승리
    userWins = userWins + 1;
    streak = streak + 1;
    const bonus = (streak - 1) * 5;
    const gained = 10 + bonus;
    score = score + gained;

    userWinsText.textContent = userWins;
    streakText.textContent = streak;
    scoreText.textContent = score;

    if (streak >= 2) {
      resultText.textContent = "🔥 " + streak + "연승 성공! (+" + gained + "점, 연승 보너스 +" + bonus + "점)";
    } else {
      resultText.textContent = "🎉 라운드 승리! (+" + gained + "점)";
    }
    resultText.style.color = "#327a55";
  } else {
    // 라운드 패배
    computerWins = computerWins + 1;
    streak = 0;

    computerWinsText.textContent = computerWins;
    streakText.textContent = streak;

    resultText.textContent = "😭 라운드 패배! 연승이 초기화되었습니다.";
    resultText.style.color = "#e74c3c";
  }

  updateHighScore();

  // 3승 달성 시 승리 축하 화면으로 전환
  if (userWins === 3) {
    score = score + 20; // 최종 우승 보너스
    scoreText.textContent = score;
    updateHighScore();

    // 축하 메시지 작성 후 화면 전환 (HTML-14 hidden 활용)
    winSummary.innerHTML =
      "최종 스코어 <strong>" + userWins + " : " + computerWins + "</strong>로 승리했습니다!<br>" +
      "우승 보너스 <strong>+20점</strong>이 추가되어 현재 총 <strong>" + score + "점</strong> (" + streak + "연승 중)입니다.";

    gameScreen.hidden = true;
    winScreen.hidden = false;

  } else if (computerWins === 3) {
    score = 0;
    scoreText.textContent = score;

    resultText.textContent = "💀 최종 패배... 컴퓨터가 먼저 3승을 달성했습니다.";
    resultText.style.color = "#e74c3c";
    startBtn.textContent = "🔄 다시 도전하기";
    startBtn.disabled = false;
  } else {
    startBtn.textContent = "▶️ 다음 라운드 시작";
    startBtn.disabled = false;
  }
}

// 6. 승리 축하 화면 버튼 기능
// [이어서 도전하기]: 점수 및 연승 유지, 승수만 초기화 후 바로 다음 라운드 시작
continueBtn.addEventListener("click", function () {
  userWins = 0;
  computerWins = 0;
  userWinsText.textContent = 0;
  computerWinsText.textContent = 0;

  winScreen.hidden = true;
  gameScreen.hidden = false;
  startSpinning();
});

// [끝내고 새로 시작]: 점수, 연승, 승수 모두 초기화 후 초기 대기 화면으로 복귀
newGameBtn.addEventListener("click", function () {
  userWins = 0;
  computerWins = 0;
  streak = 0;
  score = 0;

  userWinsText.textContent = 0;
  computerWinsText.textContent = 0;
  streakText.textContent = 0;
  scoreText.textContent = 0;

  userHand.textContent = "❓";
  userChoiceName.textContent = "대기 중";
  computerHand.textContent = "❓";
  computerChoiceName.textContent = "대기 중";
  resultText.textContent = "아래 [게임 시작] 버튼을 눌러주세요!";
  resultText.style.color = "#18324b";

  startBtn.textContent = "🎮 게임 시작";
  startBtn.disabled = false;

  winScreen.hidden = true;
  gameScreen.hidden = false;
});

// 7. 기본 버튼 이벤트 연결
startBtn.addEventListener("click", startSpinning);

scissorsBtn.addEventListener("click", function () {
  playRound("가위");
});
rockBtn.addEventListener("click", function () {
  playRound("바위");
});
paperBtn.addEventListener("click", function () {
  playRound("보");
});
