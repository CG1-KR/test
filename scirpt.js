// ===== 부드러운 내비게이션 스크롤링 =====
document.addEventListener('DOMContentLoaded', function () {
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  // 내비게이션 링크 클릭시 부드럽게 해당 섹션 이동
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: sectionTop - navbarHeight + 1, behavior: 'smooth' });
      }
    });
  });
});
