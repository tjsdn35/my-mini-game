// 1. 1부터 100 사이의 랜덤 정답 생성 (* 50 -> * 100)
let answer = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

// 2. HTML 요소 찾기
const inputElement = document.querySelector("#numberInput");
const checkButton = document.querySelector("#checkButton");
const restartButton = document.querySelector("#restartButton");
const messageElement = document.querySelector("#message");

// 3. 정답 확인 함수
function checkGuess() {
    const guess = Number(inputElement.value);

    // 입력값 검증 (guess > 50 -> guess > 100)
    if (inputElement.value === "" || guess < 1 || guess > 100) {
        messageElement.textContent = "⚠️ 1부터 100 사이의 숫자를 입력해 주세요.";
        return;
    }

    attempts = attempts + 1;

    if (guess === answer) {
        messageElement.textContent = "🎉 정답입니다! (시도 횟수: " + attempts + "번)";
    } else if (guess < answer) {
        messageElement.textContent = "⬆️ 더 큰 숫자입니다! (시도: " + attempts + "회)";
    } else {
        messageElement.textContent = "⬇️ 더 작은 숫자입니다! (시도: " + attempts + "회)";
    }

    inputElement.value = "";
    inputElement.focus();
}

// 4. 새 게임(초기화) 함수 (여기도 * 100으로 변경!)
function restartGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    inputElement.value = "";
    messageElement.textContent = "새로운 숫자(1~100)가 정해졌습니다! 다시 맞혀 보세요.";
}

// 5. 이벤트 연결
checkButton.addEventListener("click", checkGuess);
restartButton.addEventListener("click", restartGame);

inputElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkGuess();
    }
});
