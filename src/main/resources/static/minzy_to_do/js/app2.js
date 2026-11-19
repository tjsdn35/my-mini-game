// 1. 점수와 목표 점수 변수 설정
let score = 0;
const targetScore = 10; // 바뀌지 않는 목표 점수는 const 사용

// 2. HTML 요소 찾기
const scoreDisplay = document.querySelector("#score");
const gameMessage = document.querySelector("#gameMessage");
const scoreButton = document.querySelector("#scoreButton");
const resetButton = document.querySelector("#resetButton");

// 3. 점수 올리기 및 조건 확인 함수
function addScore() {
    score = score + 1;
    scoreDisplay.textContent = score;

    // 조건문으로 점수에 따른 메시지 바꾸기
    if (score === targetScore) {
        gameMessage.textContent = "🎉 축하합니다! 목표 점수 10점을 달성했습니다!";
        scoreButton.disabled = true; // 목표 달성 후 버튼 비활성화
    } else if (score >= 7) {
        gameMessage.textContent = "🔥 거의 다 왔어요! 조금만 더 누르세요!";
    } else {
        gameMessage.textContent = "좋아요! 계속 점수를 올려보세요.";
    }
}

// 4. 초기화 함수
function resetScore() {
    score = 0;
    scoreDisplay.textContent = score;
    gameMessage.textContent = "버튼을 눌러 목표 점수에 도전하세요!";
    scoreButton.disabled = false; // 버튼 다시 활성화
}

// 5. 버튼 이벤트 연결
scoreButton.addEventListener("click", addScore);
resetButton.addEventListener("click", resetScore);

// =============================================================================
// 숫자 맞추기 게임 (도전 횟수 기능 포함)
// =============================================================================

let answer = Math.floor(Math.random() * 50) + 1;
let attempts = 0;
const maxAttempts = 7;
let historyList = []; // 입력한 숫자들을 저장할 빈 배열 (교재 JS-09)

const guessInput = document.querySelector("#guessInput");
const guessButton = document.querySelector("#guessButton");
const newGameButton = document.querySelector("#newGameButton");
const guessResult = document.querySelector("#guessResult");
const attemptsDisplay = document.querySelector("#attempts");
const guessHistoryDisplay = document.querySelector("#guessHistory"); // 기록 표시 요소

// 배열에 담긴 숫자들을 화면에 출력하는 도구 함수 (교재 JS-10 for 반복문 활용)
function updateHistoryDisplay() {
    if (historyList.length === 0) {
        guessHistoryDisplay.textContent = "없음";
        return;
    }

    let text = "";
    for (let i = 0; i < historyList.length; i++) {
        text = text + historyList[i];
        // 마지막 숫자가 아니면 뒤에 쉼표(,) 붙이기
        if (i < historyList.length - 1) {
            text = text + ", ";
        }
    }
    guessHistoryDisplay.textContent = text;
}

function checkGuess() {
    // 1. 빈 칸 검사
    if (guessInput.value === "") {
        guessResult.textContent = "⚠️ 숫자를 먼저 입력해 주세요!";
        return;
    }

    const userGuess = Number(guessInput.value);

    // 2. 입력 범위 검사 (교재 JS-06-1 논리 연산자 || 활용)
    // 1보다 작거나(OR) 50보다 크면 안내 후 함수 즉시 종료
    if (userGuess < 1 || userGuess > 50) {
        guessResult.textContent = "🚫 1부터 50 사이의 숫자만 입력해 주세요!";
        guessInput.value = "";
        guessInput.focus();
        return; // 여기서 끝내므로 도전 횟수(attempts)와 기록이 올라가지 않습니다.
    }

    // 3. 정상 범위의 숫자일 때만 도전 횟수 증가 및 기록 추가
    attempts = attempts + 1;
    attemptsDisplay.textContent = attempts;
    
    historyList.push(userGuess);
    updateHistoryDisplay();

    // 4. 정답 비교
    if (userGuess === answer) {
        guessResult.textContent = "🎉 정답입니다! " + attempts + "번 만에 숫자 " + answer + "을(를) 맞혔습니다!";
        guessButton.disabled = true;
    } else if (attempts >= maxAttempts) {
        guessResult.textContent = "💥 게임 오버! 7번의 기회를 모두 썼습니다. 정답은 " + answer + "였습니다.";
        guessButton.disabled = true;
    } else if (userGuess > answer) {
        guessResult.textContent = "⬇️ 너무 커요! 더 작은 숫자를 입력해 보세요. (남은 기회: " + (maxAttempts - attempts) + "번)";
    } else {
        guessResult.textContent = "⬆️ 너무 작아요! 더 큰 숫자를 입력해 보세요. (남은 기회: " + (maxAttempts - attempts) + "번)";
    }

    guessInput.value = "";
    guessInput.focus();
}


function startNewGuessGame() {
    answer = Math.floor(Math.random() * 50) + 1;
    attempts = 0;
    historyList = []; // 새 게임 시작 시 기록 배열 비우기
    
    attemptsDisplay.textContent = attempts;
    updateHistoryDisplay(); // 화면도 '없음'으로 초기화
    
    guessResult.textContent = "새로운 숫자가 정해졌습니다! 7번 안에 맞춰보세요.";
    guessInput.value = "";
    guessButton.disabled = false;
}

guessButton.addEventListener("click", checkGuess);
newGameButton.addEventListener("click", startNewGuessGame);
