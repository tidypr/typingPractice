document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".star-container");

    function createStar() {
        const star = document.createElement("div");
        star.classList.add("star");

        // 별 크기 증가 (기존보다 3배 증가)
        const size = Math.random() * 15 + 9 + "px";  // 9px ~ 24px
        star.style.setProperty("--size", size);

        // 랜덤한 색상 및 투명도 (노란색 계열)
        const opacity = Math.random() * 0.7 + 0.3; // 0.3 ~ 1.0
        star.style.setProperty("--color", `rgba(255, 255, 150, ${opacity})`);
        star.style.setProperty("--opacity", opacity);

        // 별의 위치를 화면 전체에서 랜덤하게 배치
        star.style.left = Math.random() * 100 + "%"; // 화면 전체 너비
        star.style.bottom = Math.random() * 20 + "%"; // 낮은 위치에서 시작

        // 랜덤한 애니메이션 지속 시간
        star.style.animationDuration = Math.random() * 3 + 2 + "s"; // 2~5초 동안 떠오름

        container.appendChild(star);

        // 애니메이션 종료 후 요소 삭제
        setTimeout(() => {
            star.remove();
        }, 5000);
    }

    // 별 개수 증가 (5배 증가: 기존 150ms → 30ms)
    setInterval(createStar, 30);
});
