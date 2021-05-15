window.onload = function() {
    let [showMenu, exitMenu] = document.querySelectorAll(".icons");
    let nav = document.querySelector('.nav');
    
    // 만약 메뉴 버튼이 눌렀다면 발생되는 이벤트를 정의한다.
    showMenu.addEventListener("click", () => {
        nav.style.display = "block";
    });

    exitMenu.addEventListener("click", () => {
        nav.style.display = "none";
    });
}