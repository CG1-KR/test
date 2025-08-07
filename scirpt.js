// 최지원 정보보안 컨설턴트 포트폴리오 - 가벼운 JavaScript

/**
 * DOM 로드 후 초기화
 */
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initProjectFilter();
    initScrollAnimations();
    initContactInteraction();
    
    console.log('🔒 최지원 정보보안 컨설턴트 포트폴리오');
});

/**
 * 네비게이션 기능
 */
function initNavigation() {
    // 부드러운 스크롤링
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 70;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴 닫기
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });
    
    // 스크롤 시 활성 메뉴 업데이트
    window.addEventListener('scroll', updateActiveNavItem);
}

/**
 * 활성 네비게이션 아이템 업데이트
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
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // 활성 버튼 업데이트
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // 프로젝트 필터링
            projectItems.forEach((item, index) => {
                const categories = item.getAttribute('data-category');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    
                    // 순차적 애니메이션
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // 간단한 알림
            showToast(`${getFilterName(filter)} 프로젝트를 표시합니다.`);
        });
    });
}

/**
 * 필터명 반환
 */
function getFilterName(filter) {
    const filterNames = {
        'all': '전체',
        'web': '웹 보안',
        'app': '앱 보안', 
        'infra': '인프라 보안',
        'compliance': '컴플라이언스'
    };
    return filterNames[filter] || '프로젝트';
}

/**
 * 스크롤 애니메이션
 */
function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('stat-card')) {
                    animateCounter(element);
                }
                
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 애니메이션 대상 요소들 관찰
    const animateElements = document.querySelectorAll('.stat-card, .timeline-item, .contact-card');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

/**
 * 숫자 카운트 애니메이션
 */
function animateCounter(element) {
    const counterElement = element.querySelector('h3');
    if (!counterElement) return;
    
    const targetText = counterElement.textContent;
    const targetNumber = parseFloat(targetText.replace(/[^0-9.]/g, ''));
    const suffix = targetText.replace(/[0-9.]/g, '');
    
    if (isNaN(targetNumber)) return;
    
    let currentNumber = 0;
    const increment = targetNumber / 30;
    const duration = 1000;
    const stepTime = duration / 30;
    
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
 * 연락처 상호작용
 */
function initContactInteraction() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            const iconClass = this.querySelector('i').className;
            
            if (iconClass.includes('envelope')) {
                showToast('이메일 문의를 원하시면 포트폴리오를 통해 연락처를 확인해주세요!');
            } else if (iconClass.includes('telephone')) {
                showToast('정보보안 컨설팅 관련 문의는 언제든 연락해주세요!');
            } else if (iconClass.includes('linkedin')) {
                showToast('LinkedIn을 통해 연결해보세요!');
            }
        });
        
        // 클릭 가능함을 시각적으로 표시
        card.style.cursor = 'pointer';
    });
}

/**
 * 간단한 토스트 알림
 */
function showToast(message) {
    // 기존 토스트 제거
    const existingToast = document.querySelector('.custom-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 새 토스트 생성
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    
    // 스타일 적용
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#212529',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        zIndex: '9999',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    });
    
    document.body.appendChild(toast);
    
    // 애니메이션
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 3초 후 제거
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentElement) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

/**
 * 반응형 처리
 */
window.addEventListener('resize', function() {
    // 모바일에서 네비게이션 메뉴 자동 닫기
    if (window.innerWidth > 768) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            navbarToggler.click();
        }
    }
});

/**
 * 키보드 접근성
 */
document.addEventListener('keydown', function(e) {
    // ESC 키로 토스트 닫기
    if (e.key === 'Escape') {
        const toast = document.querySelector('.custom-toast');
        if (toast) {
            toast.remove();
        }
    }
    
    // 엔터 키로 연락처 카드 클릭
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('contact-card')) {
            focusedElement.click();
        }
    }
});

/**
 * 페이지 성능 체크
 */
window.addEventListener('load', function() {
    const loadTime = performance.now();
    if (loadTime < 2000) {
        console.log(`⚡ 페이지가 빠르게 로드되었습니다: ${Math.round(loadTime)}ms`);
    }
});

/**
 * 개발자 콘솔 메시지
 */
console.log('%c🛡️ 최지원 정보보안 컨설턴트', 'color: #0d6efd; font-size: 16px; font-weight: bold;');
console.log('%c정보보안 컨설팅 문의 환영합니다!', 'color: #198754; font-size: 12px;');
console.log('📞 문의: jwc*******@naver.com | 010-****-8782');
