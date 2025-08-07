// 보안 컨설팅 포트폴리오 JavaScript
// 최지원 정보보안 컨설턴트 포트폴리오

/**
 * DOM이 완전히 로드된 후 실행되는 메인 함수
 */
document.addEventListener('DOMContentLoaded', function() {
    // 각 기능별 초기화 함수 호출
    initNavbarScroll();
    initSmoothScrolling();
    initProjectFilter();
    initScrollAnimations();
    initTypingEffect();
    initTooltips();
    initContactForm();
    
    console.log('🔒 최지원 정보보안 컨설턴트 포트폴리오가 로드되었습니다.');
});

/**
 * 네비게이션 바 스크롤 효과
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.custom-navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향에 따른 네비게이션 바 표시/숨김
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // 스크롤 위치에 따른 배경 투명도 조정
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
        updateActiveNavItem();
    });
}

/**
 * 부드러운 스크롤링 구현
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.custom-navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 모바일에서 네비게이션 메뉴 닫기
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
}

/**
 * 현재 화면에 보이는 섹션에 따라 네비게이션 활성화 상태 업데이트
 */
function updateActiveNavItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

/**
 * 프로젝트 필터링 기능
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    const projectRows = document.querySelectorAll('.project-row');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 활성화된 버튼 스타일 업데이트
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 프로젝트 행 필터링 애니메이션
            projectRows.forEach((row, index) => {
                const categories = row.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    setTimeout(() => {
                        row.style.display = 'table-row';
                        row.classList.remove('hidden');
                        row.style.animation = `slideInLeft 0.5s ease-out ${index * 0.1}s both`;
                    }, index * 50);
                } else {
                    row.classList.add('hidden');
                    setTimeout(() => {
                        row.style.display = 'none';
                    }, 300);
                }
            });
            
            // 필터링 완료 알림
            showNotification(`${getFilterDisplayName(filter)} 프로젝트로 필터링했습니다.`, 'info');
        });
    });
}

/**
 * 필터 표시명 반환
 */
function getFilterDisplayName(filter) {
    const filterNames = {
        'all': '전체',
        'web': '웹 보안',
        'app': '앱 보안',
        'infra': '인프라 보안',
        'compliance': '컴플라이언스'
    };
    return filterNames[filter] || '알 수 없음';
}

/**
 * 스크롤 기반 애니메이션
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('timeline-item')) {
                    element.style.animation = 'slideInLeft 0.8s ease-out forwards';
                } else if (element.classList.contains('contact-item')) {
                    element.style.animation = 'fadeInUp 0.6s ease-out forwards';
                } else if (element.classList.contains('stat-item')) {
                    element.style.animation = 'fadeInUp 0.5s ease-out forwards';
                    animateCounter(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    const animateElements = document.querySelectorAll('.timeline-item, .contact-item, .stat-item');
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 숫자 카운트업 애니메이션
 */
function animateCounter(element) {
    const counterElement = element.querySelector('h3');
    if (!counterElement) return;
    
    const targetText = counterElement.textContent;
    const targetNumber = parseFloat(targetText.replace(/[^0-9.]/g, ''));
    const suffix = targetText.replace(/[0-9.]/g, '');
    
    if (isNaN(targetNumber)) return;
    
    let currentNumber = 0;
    const increment = targetNumber / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            counterElement.textContent = targetText;
            clearInterval(timer);
        } else {
            if (targetText.includes('.')) {
                counterElement.textContent = currentNumber.toFixed(1) + suffix;
            } else {
                counterElement.textContent = Math.floor(currentNumber) + suffix;
            }
        }
    }, stepTime);
}

/**
 * 타이핑 효과
 */
function initTypingEffect() {
    const titleElement = document.querySelector('.hero-content h1');
    if (!titleElement) return;
    
    const originalText = titleElement.textContent;
    titleElement.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    function typeCharacter() {
        if (index < originalText.length) {
            titleElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            // 타이핑 완료 후 커서 효과 추가
            titleElement.innerHTML += '<span class="typing-cursor">|</span>';
            
            // 커서 깜빡임 효과
            setInterval(() => {
                const cursor = document.querySelector('.typing-cursor');
                if (cursor) {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }
            }, 500);
        }
    }
    
    setTimeout(typeCharacter, 1000);
}

/**
 * 툴팁 기능 초기화
 */
function initTooltips() {
    // 프로젝트 테이블 행에 툴팁 추가
    const projectRows = document.querySelectorAll('.project-row td:nth-child(5)');
    projectRows.forEach(cell => {
        cell.setAttribute('title', '프로젝트 상세 성과 정보');
        cell.style.cursor = 'help';
    });
    
    // 프로젝트 링크에 툴팁 추가
    const projectLinks = document.querySelectorAll('.project-row .btn-outline-primary');
    projectLinks.forEach(link => {
        link.setAttribute('title', '프로젝트 상세 정보 보기');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const row = this.closest('.project-row');
            const projectName = row.querySelector('td:nth-child(2)').textContent;
            const client = row.querySelector('td:nth-child(3)').textContent;
            
            showNotification(`${projectName} - ${client}에서 수행한 프로젝트입니다.`, 'info');
        });
    });
}

/**
 * 연락처 폼 기능
 */
function initContactForm() {
    const emailElement = document.querySelector('#contact .text-light-50');
    
    if (emailElement && emailElement.textContent.includes('@')) {
        emailElement.style.cursor = 'pointer';
        emailElement.setAttribute('title', '클릭하여 이메일 안내 확인');
        
        emailElement.addEventListener('click', function() {
            showNotification('포트폴리오를 통해 연락처를 확인해주세요! 정보보안 컨설팅 문의 환영합니다.', 'info');
        });
    }
    
    // 전화번호 클릭 이벤트
    const phoneElements = document.querySelectorAll('#contact .text-light-50');
    phoneElements.forEach(element => {
        if (element.textContent.includes('010-')) {
            element.style.cursor = 'pointer';
            element.setAttribute('title', '클릭하여 연락처 안내 확인');
            
            element.addEventListener('click', function() {
