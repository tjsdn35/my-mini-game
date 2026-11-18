// 점수를 저장할 변수 score선언
let score = 0;

// 현재 점수에 10점을 올리는 addTenPoints()함수 정의
function addTenPoints() {
	score = score + 10;
	console.log("현재 점수: " + score);
	
}

// 실제 addTenPoints()함수 두번실행
addTenPoints();
addTenPoints();


const playerName = "789";

function sayHello() {
  console.log(playerName + "님, 게임에 오신 것을 환영합니다!");
}

sayHello();

// index2.html에서 id=startButton인 태그를 찾아라.
const startButton = document.querySelector("#startButton");
const endButton = document.querySelector(".endButton");

const messageElement = document.querySelector("#message");
const nameInput = document.querySelector("#playerName");
const nameButton = document.querySelector("#nameButton");

let gameScore = 0;
//클릭점수 게임요소
const scoreElement = document.querySelector("#score");
const clickButton = document.querySelector("#clickButton");
const resetButton = document.querySelector("#resetButton");
const gameMessageElement = document.querySelector("#gameMessage");

// startButton을 누르면 자동으로 실행됩니다
// 이벤트핸들러 또는 이벤트 처리함수
function startGame() {
	// 메세지창을 화면에 띄웁니다 그창을 닿아야 다른 작업이 가능
	// modal(모달) 대화창
		alert("게임버튼을 눌렸어요^^ 게임시작하시죠!");
		messageElement.textContent = "게임을 시작했습니다!";
		messageElement.classList.add("success");
}

// endButton이 눌리면 실행할 기능
function endGame() {
	// 간단히기 게임끝출력
		alert("엔드을 클릭^^ 게임종료!");
		messageElement.textContent = "게임이 종료되었습니다.";
		messageElement.classList.remove("success");
}

function message() {
		alert("게임시작!");
		messageElement.textContent = "버튼을 눌렀습니다!";
}

function checkName() {
    const inputName = nameInput.value;
    alert(inputName);
	console.log(inputName);
	messageElement.textContent = 
	inputName + "님, 게임에 오신 것을 환영합니다!";
}

function addScore() {
    gameScore = gameScore + 1;
    scoreElement.textContent = gameScore;
	
	if (gameScore === 10) {
		gameMessageElement.textContent = "10점 달성! 축하합니다!";
 	} else {
		gameMessageElement.textContent = "좋아요! 한 점을 얻었습니다.";
	}
}

function resetGame() {
    gameScore = 0;
    scoreElement.textContent = gameScore;
    gameMessageElement.textContent = "점수가 초기화되었습니다.";
}

// 이벤트를 감시하는 감시대행을 등록하면 됩니다
// 모든 이벤트 감시는 무이 그래서 하나만 감시합니다
// startButton는 마우스로 눌렸지만, 누르면  startGame()자동실행
// 태그명.startButton.addEventListener("이벤트명", 이벤트핸들러명)
startButton.addEventListener("click", startGame)
startButton.addEventListener("click", message);
endButton.addEventListener("click", endGame)
nameButton.addEventListener("click", checkName);
clickButton.addEventListener("click", addScore);
resetButton.addEventListener("click", resetGame);