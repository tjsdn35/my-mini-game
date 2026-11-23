// <header> 상단 오른쪽 id=todayDate 날짜 고치기
// HTML 요소 찾기
// 자바스크랩트에서 HTML 요소 찾기 DON필요
const todayDate = 
	document.querySelector("#todayDate");

	// 시작할때 날짜 표시
	
		
// 현재 날짜 가져오기 함수로 만들자
function showToday() {
    const now = new Date(); // 새로운 날짜를 만들어라
    // 이전 textDate의 속성 textConDate에 값을 지금 날짜로 수정
    // intl : 세계문화권 함수 라이브러리
    // DateTimeFormat : 세계 문화권의 날짜/시간을 담당하는 클래스
    todayDate.textContent = new Intl.DateTimeFormat(
        "ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long"
		
    }).format(now);
}



