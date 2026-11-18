// 함수 정의
// function 함수면(입력 매개변수) {
//	입력매개변수를 사용한 처리문...
//	}
// 이벤트를 만드는(이벤트를 생성하는) 태그
// 1. html태그를 자바스크립트에서 쓸려면
// 2. html태그를 찾는 querySelector(셀렉터이름)
// 3. 모든 html태그는 Document Object Model이라는
// 		자바스크랩트객체(데이터)에 들은 약자
// 4. Document객체를 DOM이라고 약자로 부름
const helloButton = document.querySelector("#helloButton");
// 내가 만든 처리함수
function sayHello() {
    alert("안녕하세요!");
}

// html객체와 이벤트(실제 마우스 누름 같은 click이라고함)
// 이벤트 연결등록 그러면 이벤트를 감시하다
// 이벤트가 발생하면(예로 click이벤트) 실행할 함수 등록
helloButton.addEventListener("click",sayHello)


// 섹선 12 예제
// 1. 컬러 배열 선언
const color = ["pink", 
				"green",
	 			"yellow",
	 			"white",
	 			"red"];
// 2. html 태그 button1, button2, button3 찾기
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const button5 = document.querySelector("#button5");

// 3. 버튼이 누르면 처리(실행)할 함수정의
function button1click() {
	alert("버튼1을 눌렸어요"+ color[0]);
}
function button2click() {
	alert("버튼2을 눌렸어요"+ color[1]);
}
function button3click() {
	alert("버튼3을 눌렸어요"+ color[2]);
}
function button4click() {
	alert("버튼4을 눌렸어요"+ color[3]);
}
function button5click() {
	alert("버튼5을 눌렸어요"+ color[4]);
}
// 4. 이벤트(지금'click')가 밸생하면 처리핳 함수가 실행
//		 되도록 모니터 예약 등록
/*
button1.addEventListener("click",button1click);
button2.addEventListener("click",button2click);
button3.addEventListener("click",button3click);
button4.addEventListener("click",button4click);
button5.addEventListener("click",button5click);
*/

// toList 제어하기

/*	 
// 1. 추가버튼 찾기
const addButton =
	 document.querySelector("#addButton");
// 2. #addButton요소를 눌렀는가 모니터링
addButton.addEventListener(
	"click", function() {alert("버튼을 클릭했어요!");});

// 3. 입력창에서 글자 가져오기
const input = document.querySelector("#taskInput");
// alert("입력내용: " + input.value);

// 4. ul에 추가할 내용을 등록하기 위해
// li태그 필요. 자바스크립트로 새로 만들어야 함
const item = document.createElement("li");
// 5. li item에 input값을 저장
item.textContent = input.value;

// 6. dom으로 "#taskList" ul요소를 찾기
const taskList = document.querySelector("#taskList")
taskList.append(item);

*/

// 1. 추가버튼 찾기
const addButton =
	 document.querySelector("#addButton");

// 2. #addButton요소를 눌렀는가 모니터링
addButton.addEventListener(
    "click", function() {
	// 3. 입력창에서 글자 가져오기
        const input = document.querySelector("#taskInput");
	// 3.5 입력창에 값이 비었으면 li추가 취소
	if (input.value.trim() === "") {
	    alert("값이 없어요 입력해 주세요!"); // 입력값없음 알림
	    return;
	}

	// 4. ul에 추가할 내용을 등록하기 위해 li태그 새로 만들기
        const item = document.createElement("li");

	// 5. li item에 input값을 저장
        item.textContent = input.value;

	// 6. dom으로 "#taskList" ul요소를 찾기
        const taskList = document.querySelector("#taskList");
        taskList.append(item);
	// 6.5 추가된 할일을 완료표시하기(취소선으로 완료)
	// 아이템 리스트를 마우스로 클릭하는 경우
        item.addEventListener(
			"click", function() {
            item.style.textDecoration = "line-through";
        });
		
	// 7. 새로 li에 값이 추가되고 나면
	// input태그 값을 ""초기화
		input.value = "";
	
    }
);

// loadStroge을 이용한 행운뽑기
// 1. 포춘종류 배열만듭니다.
const fortunes = [
	"오늘은  행운이 가득해",
	"멋진 일이 셍길거야",
	"오늘은 맛있는 걸 먹자",
	"새로운 도전을 시작해 봐",
	"너는 충분히 잘하고 있어"
];
// 2. 선택된 포춘을 저장하는 포춘변수를 초기화
let currentFortune = "";

// 3. 실제 포춘을 뽑는 함수 정의 brawFortuen()wjddml
function brawFortuen() {
	// 1. 포춘배열에서 난수로 인덱스 번호를 가져오면된다
	// 2. 난수 만들기 -> 임의의 정수 생성
	// math.floor(숫자의 범위) :
	//		수학라이브러리.주어진 범위에서 가장 작은 정수를 뽑는 함수
	// 숫자의 범위는 난수를 발생시킨 값 * 배열의 갯수
	// 0 <= 난수 <= 배열의 갯수 사이의 실수
	// floor(3.5) : 3을 리턴
	// Math.random() : 0.0 <= 난수 < 1.0보다 작은 실수
	const index = 	Math.floor(
		Math.random() * fortunes.length
	); // 배열.length : 배열의 크기
	
	// 현재 랜덤 행운 뽑기
	currentfortunes = fortunes[index];
	
	// 현재 운세의 내용을 result 태그에 출력
	document.querySelector("#result").textContent =
	currentFortune;
}
// 4. 포춘을 저장하는 함수 정의 saveFortuen()wjddml
function aveFortuen() {
	
}
// 5. 저장된 포춘을 불러옵니다 함수 정의 loadFortuen()wjddml
function loadFortuen() {
	
}
// 6. 저장된 포춘정보를 삭제하기 함수 정의 deleteFortuen()wjddml
function deleteFortuen() {
	
}