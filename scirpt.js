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
                showNotification('정보보안 컨설팅 관련 문의는 언제든 연락해주세요!', 'success');
            });
        }
    });
}

/**
 * 알림 메시지 표시 함수
 */
function showNotification(message, type = 'info') {
    // 기존 알림이 있다면 제거
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 알림 타입별 색상 설정
    const typeColors = {
        'info': '#0dcaf0',
        'success': '#198754',
        'warning': '#ffc107',
        'error': '#dc3545'
    };
    
    const typeIcons = {
        'info': 'info-circle',
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'error': 'x-circle'
    };
    
    // 새 알림 요소 생성
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 350px;
        max-width: 500px;
        padding: 20px;
        border-radius: 15px;
        background: rgba(26, 26, 26, 0.95);
        border: 1px solid ${typeColors[type]};
        backdrop-filter: blur(10px);
        color: white;
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        transform: translateX(100%);
        transition: all 0.4s ease;
        font-family: 'Segoe UI', sans-serif;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <i class="bi bi-${typeIcons[type]}" style="color: ${typeColors[type]}; font-size: 1.5rem; flex-shrink: 0;"></i>
            <div style="flex: 1;">
                <div style="font-weight: 600; margin-bottom: 5px; color: ${typeColors[type]};">
                    ${type === 'info' ? '정보' : type === 'success' ? '성공' : type === 'warning' ? '주의' : '오류'}
                </div>
                <div style="color: rgba(255,255,255,0.9); line-height: 1.4;">
                    ${message}
                </div>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: rgba(255,255,255,0.6); font-size: 1.2rem; cursor: pointer; padding: 5px;">
                <i class="bi bi-x"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 애니메이션으로 알림 표시
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 5초 후 자동 제거
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 400);
        }
    }, 5000);
}

/**
 * 성능 최적화를 위한 디바운스 함수
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 반응형 디자인 지원
 */
window.addEventListener('resize', debounce(function() {
    // 모바일 환경에서 네비게이션 메뉴 자동 닫기
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (window.innerWidth > 768 && navbarCollapse.classList.contains('show')) {
        const navbarToggler = document.querySelector('.navbar-toggler');
        navbarToggler.click();
    }
    
    // 알림 위치 조정
    const notifications = document.querySelectorAll('.custom-notification');
    notifications.forEach(notification => {
        if (window.innerWidth <= 768) {
            notification.style.right = '10px';
            notification.style.left = '10px';
            notification.style.minWidth = 'auto';
        } else {
            notification.style.right = '20px';
            notification.style.left = 'auto';
            notification.style.minWidth = '350px';
        }
    });
}, 250));

/**
 * 접근성 개선
 */
document.addEventListener('keydown', function(e) {
    // ESC 키로 알림 닫기
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('.custom-notification');
        notifications.forEach(notification => notification.remove());
    }
    
    // 탭 키 네비게이션 개선
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    // 엔터 키로 프로젝트 상세 정보 보기
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('btn-outline-primary')) {
            focusedElement.click();
        }
    }
});

// 마우스 사용 시 키보드 네비게이션 스타일 제거
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

/**
 * 프로젝트 통계 정보 표시
 */
function showProjectStats() {
    const projectRows = document.querySelectorAll('.project-row');
    const totalProjects = projectRows.length;
    
    const categories = {
        web: 0,
        app: 0,
        infra: 0,
        compliance: 0
    };
    
    projectRows.forEach(row => {
        const categoryAttr = row.getAttribute('data-category');
        if (categoryAttr) {
            const projectCategories = categoryAttr.split(' ');
            projectCategories.forEach(cat => {
                if (categories.hasOwnProperty(cat)) {
                    categories[cat]++;
                }
            });
        }
    });
    
    console.log('📊 프로젝트 통계:', {
        '총 프로젝트': totalProjects,
        '웹 보안': categories.web,
        '앱 보안': categories.app,
        '인프라 보안': categories.infra,
        '컴플라이언스': categories.compliance
    });
}

/**
 * 개발자 도구 감지 및 환영 메시지
 */
function detectDevTools() {
    let devtools = {
        open: false,
        orientation: null
    };
    
    setInterval(() => {
        if (window.outerHeight - window.innerHeight > 160 || window.outerWidth - window.innerWidth > 160) {
            if (!devtools.open) {
                devtools.open = true;
                console.log('🔒 최지원 정보보안 컨설턴트의 포트폴리오에 오신 것을 환영합니다!');
                console.log('💼 웹/모바일 보안 진단, 모의해킹 관련 문의는 언제든 연락해주세요.');
                console.log('🛡️ 3년 7개월간 윈스 정보보안팀에서 실무 경험을 쌓았습니다.');
                console.log('🏢 현재 대형 통신사 그룹 전담 보안컨설턴트로 활동 중입니다.');
                console.log('📈 17개 이상의 정부기관, 금융기관 프로젝트를 성공적으로 완료했습니다.');
                
                // 프로젝트 통계 표시
                showProjectStats();
                
                // 기술 스택 정보
                console.log('🔧 주요 기술 스택: Python, C/C++, Frida, AWS, Unity 보안, CVE 분석');
            }
        } else {
            devtools.open = false;
        }
    }, 500);
}

/**
 * 페이지 성능 모니터링
 */
function initPerformanceMonitoring() {
    // 페이지 로드 시간 측정
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`⚡ 페이지 로드 시간: ${Math.round(loadTime)}ms`);
        
        if (loadTime > 3000) {
            console.warn('⚠️ 페이지 로드 시간이 3초를 초과했습니다.');
        }
    });
    
    // 스크롤 성능 모니터링
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
            
            // 스크롤 진행률이 특정 지점에 도달했을 때 이벤트 발생
            if (scrollPercent > 25 && !sessionStorage.getItem('quarter_scrolled')) {
                sessionStorage.setItem('quarter_scrolled', 'true');
                console.log('📖 포트폴리오의 1/4 지점을 통과했습니다.');
            }
            
            if (scrollPercent > 75 && !sessionStorage.getItem('three_quarter_scrolled')) {
                sessionStorage.setItem('three_quarter_scrolled', 'true');
                console.log('📖 포트폴리오의 3/4 지점을 통과했습니다. 거의 다 읽으셨네요!');
            }
        }, 100);
    });
}

// 초기화 함수들 실행
if (typeof window !== 'undefined') {
    detectDevTools();
    initPerformanceMonitoring();
    
    // 환영 메시지
    console.log('%c🎯 최지원 정보보안 컨설턴트 포트폴리오', 'color: #0d6efd; font-size: 16px; font-weight: bold;');
    console.log('%c보안 컨설팅 문의 환영합니다!', 'color: #198754; font-size: 14px;');
}
