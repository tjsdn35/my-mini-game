/* {
  question: "화면에 보여줄 질문 문장",
  options: ["첫 번째 보기", "두 번째 보기", "세 번째 보기", "네 번째 보기"],
  answer: 0, // 정답 위치 번호 (첫 번째가 0, 두 번째가 1, 세 번째가 2, 네 번째가 3)
  hint: "힌트 보기 버튼을 눌렀을 때 나올 문장",
  explanation: "정답 확인 후 아래에 나올 해설"
} */

// 1. 문제 데이터 (hint 속성 추가)
const questions = [
  {
    question: "웹페이지의 구조를 만드는 언어는?",
    options: ["HTML", "CSS", "JavaScript"],
    answer: 0,
    hint: "HyperText Markup Language의 줄임말입니다.",
    explanation: "HTML은 웹페이지의 구조를 만듭니다."
  },
  {
    question: "화면의 색상과 배치를 정하는 기술은?",
    options: ["HTML", "CSS", "JavaScript"],
    answer: 1,
    hint: "Cascading Style Sheets의 줄임말로, 디자이너 역할을 합니다.",
    explanation: "CSS는 화면의 디자인을 담당합니다."
  },
  {
    question: "버튼 클릭 등 웹페이지의 동작을 만드는 언어는?",
    options: ["HTML", "CSS", "JavaScript"],
    answer: 2,
    hint: "게임의 두뇌 역할을 하며 변수와 함수를 사용합니다.",
    explanation: "JavaScript는 사용자의 행동에 반응하는 동작을 만듭니다."
  },
  {
    question: "CSS에서 클래스(class)를 선택할 때 앞에 붙이는 기호는?",
    options: ["#", ".", "@"],
    answer: 1,
    hint: "아이디(#)와 달리 여러 요소에 반복해서 쓸 수 있으며 '점'으로 시작합니다.",
    explanation: "클래스 선택자는 점(.), 아이디 선택자는 샵(#)을 사용합니다."
  },
  {
    question: "JavaScript에서 나중에 값이 바뀔 수 있는 변수를 선언할 때는?",
    options: ["const", "let", "function"],
    answer: 1,
    hint: "점수(score)처럼 게임 중에 값이 변할 때 사용합니다.",
    explanation: "값이 바뀌는 변수는 let, 바뀌지 않는 상수는 const를 사용합니다."
  },
  {
    question: "대한민국의 남동쪽에 위치한 제2의 도시이자 최대 항구 도시는?",
    options: ["인천", "부산", "울산", "여수"],
    answer: 1,
    hint: "해운대와 광안리가 있는 곳입니다.",
    explanation: "부산은 대한민국 최대의 항구 도시이자 제2의 도시입니다."
  },
  {
    question: "Spring Boot 프로젝트에서 HTML, CSS, JS 같은 정적 웹 파일을 넣는 기본 폴더 이름은?",
    options: ["java", "templates", "static", "gradle"],
    answer: 2,
    hint: "src/main/resources 아래에 있는 '정적인'이라는 뜻의 영어 단어입니다.",
    explanation: "정적 웹 리소스는 src/main/resources/static 폴더에 배치합니다."
  },
  {
    question: "JavaScript에서 0 이상 1 미만의 무작위 소수 값을 만들어 주는 함수는?",
    options: ["Math.floor()", "Math.random()", "Number()", "querySelector()"],
    answer: 1,
    hint: "'무작위'라는 뜻의 영어 단어가 들어갑니다.",
    explanation: "Math.random()은 0 이상 1 미만의 난수를 생성합니다."
  },
  {
    question: "웹페이지에서 F12 키를 눌렀을 때 JavaScript의 console.log() 결과를 확인하는 탭은?",
    options: ["Elements", "Network", "Console", "Sources"],
    answer: 2,
    hint: "개발자 도구에서 메시지 출력을 담당하는 탭 이름입니다.",
    explanation: "브라우저 개발자 도구(F12)의 Console 탭에서 로그와 오류를 확인합니다."
  },
  {
    question: "CSS에서 요소의 테두리(border)와 내부 글자(content) 사이의 안쪽 여백을 뜻하는 속성은?",
    options: ["margin", "padding", "gap", "border-radius"],
    answer: 1,
    hint: "바깥쪽 여백은 margin, 안쪽 여백은 이것입니다.",
    explanation: "padding은 내용과 테두리 사이의 안쪽 여백을 지정합니다."
  }
];

// 2. 게임 상태 변수
let currentIndex = 0;
let score = 0;
let answered = false;

// 3. HTML 요소 가져오기
const gameScreen = document.querySelector("#gameScreen");
const resultScreen = document.querySelector("#resultScreen");
const progressText = document.querySelector("#progressText");
const scoreElement = document.querySelector("#score");
const progressBar = document.querySelector("#progressBar");
const questionElement = document.querySelector("#question");
const hintButton = document.querySelector("#hintButton");
const hintText = document.querySelector("#hintText");
const optionsElement = document.querySelector("#options");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#nextButton");
const finalScoreElement = document.querySelector("#finalScore");
const resultMessageElement = document.querySelector("#resultMessage");
const restartButton = document.querySelector("#restartButton");

// 4. 현재 문제 화면에 표시하기
function showQuestion() {
  answered = false;
  nextButton.hidden = true;

  // 힌트 및 피드백 초기화
  hintText.hidden = true;
  hintText.textContent = "";
  feedbackElement.textContent = "보기 중 하나를 선택해 주세요.";
  feedbackElement.classList.remove("success", "error");

  const currentQuiz = questions[currentIndex];
  progressText.textContent = (currentIndex + 1) + " / " + questions.length;
  scoreElement.textContent = score;
  progressBar.style.width = ((currentIndex + 1) / questions.length * 100) + "%";
  questionElement.textContent = currentQuiz.question;

  optionsElement.innerHTML = "";
  for (let i = 0; i < currentQuiz.options.length; i++) {
    const button = document.createElement("button");
    button.textContent = currentQuiz.options[i];
    button.classList.add("option-button");
    button.addEventListener("click", function () {
      checkAnswer(i);
    });
    optionsElement.appendChild(button);
  }
}

// 5. 힌트 보기 기능 (Chapter 06 도전 미션)
function showHint() {
  const currentQuiz = questions[currentIndex];
  hintText.textContent = "힌트: " + currentQuiz.hint;
  hintText.hidden = false;
}

// 6. 정답 확인 및 색상 강조하기
function checkAnswer(selectedIndex) {
    if (answered) return;
   		 answered = true;

    const currentQuiz = questions[currentIndex];
    const allButtons = optionsElement.querySelectorAll("button");

    for (let i = 0;i < allButtons.length;i++) {
        allButtons[i].disabled = true;
    }

    if (selectedIndex === currentQuiz.answer) {
        score = score + 10;
        scoreElement.textContent = score;
        feedbackElement.textContent = "정답입니다! (+10점) " + currentQuiz.explanation;
        feedbackElement.classList.add("success"); // 정답 문구 초록색 강조
        allButtons[selectedIndex].classList.add("correct"); // 선택한 버튼 초록색 강조
    } else {
        feedbackElement.textContent = "오답입니다! " + currentQuiz.explanation;
        feedbackElement.classList.add("error"); // 오답 문구 빨간색 강조
        allButtons[selectedIndex].classList.add("wrong"); // 틀린 버튼 빨간색 강조
        allButtons[currentQuiz.answer].classList.add("correct"); // 실제 정답 버튼 초록색 표시
    }

    if (currentIndex === questions.length - 1) {
        nextButton.textContent = "결과 보기";
    } else {
        nextButton.textContent = "다음 문제";
    }
   
	 nextButton.hidden = false;
}

// 7. 다음 문제 또는 결과 화면으로 이동
function handleNext() {
  currentIndex = currentIndex + 1;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// 8. 최종 결과 화면 표시
function showResult() {
  gameScreen.hidden = true;
  resultScreen.hidden = false;
  const maxScore = questions.length * 10;
  finalScoreElement.textContent = score + "점 / " + maxScore + "점";

  if (score === maxScore) {
    resultMessageElement.textContent = "완벽합니다! 모든 문제를 맞혔어요!";
  } else if (score >= maxScore * 0.6) {
    resultMessageElement.textContent = "잘했어요! 조금만 더 하면 만점입니다.";
  } else {
    resultMessageElement.textContent = "다시 도전해서 더 높은 점수에 도전해 보세요!";
  }
}

// 9. 다시 도전하기
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  resultScreen.hidden = true;
  gameScreen.hidden = false;
  showQuestion();
}

hintButton.addEventListener("click", showHint);
nextButton.addEventListener("click", handleNext);
restartButton.addEventListener("click", restartQuiz);

// 첫 문제 시작
showQuestion();
