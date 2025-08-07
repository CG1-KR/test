document.addEventListener('DOMContentLoaded', () => {
    const mainNav = document.getElementById('mainNav');

    // 스크롤 시 내비게이션 바에 그림자 효과 추가
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('navbar-scrolled');
        } else {
            mainNav.classList.remove('navbar-scrolled');
        }
    });

    // 스무스 스크롤링 구현
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
