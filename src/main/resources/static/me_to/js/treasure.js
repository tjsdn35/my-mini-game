// 1. HTML 요소 가져오기
const boxes = document.querySelectorAll(".box-btn");
const messageText = document.querySelector("#message");
const chancesText = document.querySelector("#chances");
const scoreText = document.querySelector("#score");
const highScoreText = document.querySelector("#highScore");
const resetButton = document.querySelector("#resetButton");

// 2. 게임 상태 변수
let treasureIndex = 0;
let bombIndex = 0;
let chances = 5;
let score = 0;
let isGameOver = false;

// localStorage에서 저장된 최고 점수 불러오기
let highScore = Number(localStorage.getItem("treasureHighScore")) || 0;
highScoreText.textContent = highScore;

// 3. 작은 도구 함수들
// 보물과 폭탄 위치 설정
function setItems() {
  treasureIndex = Math.floor(Math.random() * 9);
  bombIndex = Math.floor(Math.random() * 9);

  while (treasureIndex === bombIndex) {
    bombIndex = Math.floor(Math.random() * 9);
  }
}

// 선택한 상자와 보물 사이의 위치 관계에 따른 힌트 반환
function getTreasureHint(clickedIndex) {
  const clickedRow = Math.floor(clickedIndex / 3);
  const clickedCol = clickedIndex % 3;

  const treasureRow = Math.floor(treasureIndex / 3);
  const treasureCol = treasureIndex % 3;

  const rowDiff = Math.abs(clickedRow - treasureRow);
  const colDiff = Math.abs(clickedCol - treasureCol);

  if (rowDiff + colDiff === 1) {
    return "🔥 뜨거워요! 보물이 바로 옆에 있습니다!";
  } else if (rowDiff === 1 && colDiff === 1) {
    return "🌠 빗나갔어요! 보물이 대각선 방향에 있습니다!";
  } else {
    return "❄️ 차가워요! 보물은 조금 멀리 있습니다.";
  }
}

// 게임 종료 시 보물과 폭탄 위치 모두 공개
function revealAnswers() {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].disabled = true; // 모든 상자 클릭 잠금

    if (i === treasureIndex) {
      boxes[i].textContent = "💎 보물!";
      boxes[i].classList.add("treasure");
    } else if (i === bombIndex) {
      boxes[i].textContent = "💣 폭탄!";
      boxes[i].classList.add("bomb");
    }
  }
}

// 게임 시작 시 초기화 실행
setItems();

// 4. 상자 클릭 이벤트 연결
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    if (isGameOver || boxes[i].disabled) {
      return;
    }

    chances = chances - 1;
    chancesText.textContent = chances;
    boxes[i].disabled = true;

    if (i === treasureIndex) {
      // 보물을 찾은 경우
      score = 50 + (chances * 10);
      scoreText.textContent = score;
      isGameOver = true;
      revealAnswers(); // 폭탄 위치도 함께 공개

      if (score > highScore) {
        highScore = score;
        highScoreText.textContent = highScore;
        localStorage.setItem("treasureHighScore", highScore);
        messageText.textContent = "🏆 신기록 달성! " + score + "점으로 최고 점수를 경신했습니다!";
      } else {
        messageText.textContent = "🎉 축하합니다! 보물을 찾아 " + score + "점을 획득했습니다!";
      }

    } else if (i === bombIndex) {
      // 폭탄을 누른 경우
      isGameOver = true;
      revealAnswers(); // 보물 위치도 함께 공개
      messageText.textContent = "💥 펑! 폭탄을 밟아 게임이 끝났습니다.";

    } else {
      // 빈 상자인 경우
      boxes[i].textContent = "💨 빈 상자";
      boxes[i].classList.add("empty");

      if (chances === 0) {
        isGameOver = true;
        revealAnswers(); // 보물과 폭탄 위치 모두 공개
        messageText.textContent = "😭 기회를 모두 사용했습니다! 보물과 폭탄 위치를 확인하세요.";
      } else {
        const hint = getTreasureHint(i);
        messageText.textContent = hint + " (남은 기회: " + chances + "번)";
      }
    }
  });
}

// 5. 다시 시작 버튼 기능
function resetGame() {
  setItems();
  chances = 5;
  score = 0;
  isGameOver = false;

  chancesText.textContent = chances;
  scoreText.textContent = score;
  messageText.textContent = "상자를 눌러 보물을 찾으세요. (폭탄 1개 주의!)";

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = (i + 1) + "번 상자";
    boxes[i].disabled = false;
    boxes[i].classList.remove("treasure", "bomb", "empty");
  }
}

resetButton.addEventListener("click", resetGame);
