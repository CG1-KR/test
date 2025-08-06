/* ===================================
   Security Portfolio JavaScript
   =================================== */

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    
    /* ===================================
       Smooth Scrolling for Navigation Links
       내비게이션 링크 클릭 시 부드러운 스크롤 효과
       =================================== */
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // href가 #으로 시작하는 경우에만 처리
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // 네비게이션 바 높이를 고려한 스크롤 위치 계산
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // 모바일에서 네비게이션 메뉴 닫기
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
    
    /* ===================================
       Active Navigation Link Highlighting
       스크롤 위치에 따른 네비게이션 링크 활성화
       =================================== */
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // 모든 네비게이션 링크에서 active 클래스 제거
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // 현재 섹션에 해당하는 링크에 active 클래스 추가
                const activeLink = document.querySelector(`.navbar-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // 스크롤 이벤트에 highlightNavigation 함수 연결
    window.addEventListener('scroll', highlightNavigation);
    
    /* ===================================
       Project Filter Functionality
       프로젝트 필터링 기능 구현
       =================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectRows = document.querySelectorAll('.project-row');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 필터 버튼에서 active 클래스 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭된 버튼에 active 클래스 추가
            this.classList.add('active');
            
            // 선택된 필터 가져오기
            const filterValue = this.getAttribute('data-filter');
            
            // 프로젝트 행 필터링
            projectRows.forEach(row => {
                if (filterValue === 'all') {
                    // 전체 보기
                    row.style.display = '';
                    row.classList.remove('hide');
                } else {
                    // 특정 카테고리 필터링
                    const categories = row.getAttribute('data-categories').split(',');
                    
                    if (categories.includes(filterValue)) {
                        row.style.display = '';
                        row.classList.remove('hide');
                    } else {
                        row.style.display = 'none';
                        row.classList.add('hide');
                    }
                }
            });
            
            // 필터링 후 테이블 애니메이션 효과
            animateFilteredRows();
        });
    });
    
    /* ===================================
       Table Row Animation
       필터링된 테이블 행 애니메이션
       =================================== */
    function animateFilteredRows() {
        const visibleRows = document.querySelectorAll('.project-row:not(.hide)');
        
        visibleRows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                row.style.opacity = '1';
                row.style.transform = 'translateY(0)';
            }, index * 100); // 각 행마다 100ms 딜레이
        });
    }
    
    /* ===================================
       Scroll to Top Button
       페이지 상단으로 스크롤 버튼 (옵션)
       =================================== */
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // 스크롤 위치에 따라 버튼 표시/숨김
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    
    // 버튼 클릭 시 상단으로 스크롤
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    /* ===================================
       Timeline Animation on Scroll
       타임라인 스크롤 애니메이션
       =================================== */
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimelineItems() {
        const triggerBottom = window.innerHeight * 0.8;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('show');
            }
        });
    }
    
    // 초기 스타일 설정
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // show 클래스 스타일
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item.show {
            opacity: 1 !important;
            transform: translateX(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // 스크롤 이벤트에 연결
    window.addEventListener('scroll', checkTimelineItems);
    
    // 초기 체크
    checkTimelineItems();
    
    /* ===================================
       Navbar Scroll Effect
       스크롤 시 네비게이션 바 스타일 변경
       =================================== */
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            navbar.style.padding = '0.5rem 0';
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll);
    
    /* ===================================
       Modal Enhancement
       모달 열릴 때 애니메이션 효과
       =================================== */
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            this.querySelector('.modal-content').style.animation = 'modalFadeIn 0.3s ease';
        });
    });
    
    // 모달 애니메이션 스타일 추가
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.8) translateY(-30px);
            }
            to {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
    document.head.appendChild(modalStyle);
    
    /* ===================================
       Skill Cards Hover Effect
       기술 카드 호버 효과 강화
       =================================== */
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('i').style.transform = 'scale(1.2)';
            this.querySelector('i').style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('i').style.transform = 'scale(1)';
        });
    });
    
    /* ===================================
       Domain Experience Chart
       진단 분야별 경험 차트
       =================================== */
    const domainCanvas = document.getElementById('domainChart');
    if (domainCanvas) {
        const ctx = domainCanvas.getContext('2d');
        
        // 도넛 차트 그리기
        const data = [
            { label: '웹 애플리케이션', value: 45, color: '#0d6efd' },
            { label: '모바일 앱', value: 30, color: '#ffc107' },
            { label: '클라우드/인프라', value: 25, color: '#0dcaf0' }
        ];
        
        // 차트 크기 설정
        const centerX = domainCanvas.width / 2;
        const centerY = domainCanvas.height / 2;
        const radius = 80;
        const innerRadius = 50;
        
        let currentAngle = -Math.PI / 2; // 12시 방향에서 시작
        
        // 각 섹션 그리기
        data.forEach((segment, index) => {
            const sliceAngle = (segment.value / 100) * 2 * Math.PI;
            
            // 섹션 그리기
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();
            ctx.fillStyle = segment.color;
            ctx.fill();
            
            // 라벨 그리기
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
            const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
            
            ctx.fillStyle = '#333';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(segment.label, labelX, labelY);
            ctx.font = 'bold 16px sans-serif';
            ctx.fillText(segment.value + '%', labelX, labelY + 18);
            
            currentAngle += sliceAngle;
        });
        
        // 중앙 텍스트
        ctx.fillStyle = '#333';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('진단 경험', centerX, centerY);
    }
    
    /* ===================================
       Console Easter Egg
       개발자 콘솔 이스터 에그
       =================================== */
    console.log('%c🔒 Security Portfolio', 'font-size: 24px; font-weight: bold; color: #0d6efd;');
    console.log('%c보안은 기술이 아닌 마음가짐입니다.', 'font-size: 14px; color: #6c757d;');
    console.log('%c궁금하신 점이 있으시면 연락 주세요!', 'font-size: 14px; color: #198754;');
    
});
