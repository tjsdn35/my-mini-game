// 1. HTML 요소 가져오기
const boxes = document.querySelectorAll(".box-btn");
const messageText = document.querySelector("#message");
const triesText = document.querySelector("#tries");
const resetButton = document.querySelector("#resetButton");

// 2. 게임 상태 변수 (JS-02, JS-11 활용)
let treasureIndex = Math.floor(Math.random() * 9); // 0~8 중 보물 위치 결정
let tries = 0;
let isGameOver = false;

// 3. 상자 9개에 클릭 기능 연결하기 (JS-10 반복문 활용)
for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    // 이미 게임이 끝났거나 이미 열어본 상자면 무시
    if (isGameOver || boxes[i].disabled) {
      return;
    }

    tries = tries + 1;
    triesText.textContent = tries;
    boxes[i].disabled = true; // 한 번 누른 상자 비활성화 (HTML-14 참고)

    // 보물 위치와 비교 (JS-05, JS-06 활용)
    if (i === treasureIndex) {
      boxes[i].textContent = "💎 보물!";
      messageText.textContent = "축하합니다! " + tries + "번 만에 보물을 찾았습니다!";
      isGameOver = true;
    } else {
      boxes[i].textContent = "꽝";
      messageText.textContent = "아쉽네요! 다른 상자를 열어보세요.";
    }
  });
}

// 4. 다시 시작 버튼 기능
function resetGame() {
  treasureIndex = Math.floor(Math.random() * 9);
  tries = 0;
  isGameOver = false;
  triesText.textContent = tries;
  messageText.textContent = "상자를 눌러 보물을 찾으세요.";

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].textContent = (i + 1) + "번 상자";
    boxes[i].disabled = false;
  }
}

resetButton.addEventListener("click", resetGame);
