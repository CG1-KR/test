// =========================================
// 기술스택 관련 JavaScript 기능 (기존 script.js 파일에 추가)
// =========================================

// 기존 DOMContentLoaded 이벤트 리스너 수정
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initProjectFilter();
    initScrollAnimations();
    initContactInteraction();
    initTechStackInteraction(); // 🔥 새로 추가
    
    console.log('🌟 최지원 정보보안 컨설턴트 포트폴리오가 로드되었습니다.');
});

/**
 * 기술스택 카드 상호작용 (새로 추가되는 함수)
 */
function initTechStackInteraction() {
    const techCards = document.querySelectorAll('.tech-logo-card');
    
    const techDescriptions = {
        'Web': '웹 애플리케이션 보안 진단 및 취약점 분석 전문',
        'Mobile': 'iOS/Android 모바일 앱 보안성 검토 및 진단',
        'Cloud': 'AWS/Azure 클라우드 인프라 보안 검토 및 설정',
        'AI': 'AI 보안 및 Prompt Injection 취약점 연구',
        'Python': '보안 도구 개발 및 자동화 스크립팅',
        'JavaScript': '웹 보안 진단 및 클라이언트 사이드 분석'
    };
    
    techCards.forEach(card => {
        // 클릭 이벤트
        card.addEventListener('click', function() {
            const techName = this.querySelector('.tech-logo-name').textContent;
            const description = techDescriptions[techName];
            
            if (description) {
                showTechNotification(techName, description);
            }
        });
        
        // 키보드 접근성 - 엔터키
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // 호버 효과 강화
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });
}

/**
 * 기술스택 알림 표시 (새로 추가되는 함수)
 */
function showTechNotification(techName, description) {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.tech-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = 'tech-notification';
    notification.innerHTML = `
        <div class="notification-header">
            💻 ${techName}
        </div>
        <div class="notification-body">
            ${description}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 모바일과 데스크톱에 따른 애니메이션
    if (window.innerWidth <= 768) {
        // 모바일: 위에서 아래로
        notification.style.transform = 'translateY(-100%)';
        notification.classList.add('show');
        setTimeout(() => {
            notification.style.transform = 'translateY(0)';
        }, 100);
    } else {
        // 데스크톱: 오른쪽에서 왼쪽으로
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
    }
    
    // 4초 후 자동 제거
    setTimeout(() => {
        if (window.innerWidth <= 768) {
            notification.style.transform = 'translateY(-100%)';
        } else {
            notification.style.transform = 'translateX(100%)';
        }
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// 기존 initScrollAnimations 함수 수정 (기술스택 애니메이션 추가)
function initScrollAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // 통계 숫자 애니메이션
                if (element.classList.contains('stat-number')) {
                    animateNumber(element);
                }
                
                // 🔥 기술스택 카드 순차 애니메이션 추가
                if (element.classList.contains('tech-stack-visual')) {
                    const cards = element.querySelectorAll('.tech-logo-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1) translateY(0)';
                        }, index * 150);
                    });
                }
                
                // 요소 표시 애니메이션
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 애니메이션 대상 요소들 (🔥 tech-stack-visual 추가)
    const animateElements = document.querySelectorAll('.stat-number, .service-card, .project-card, .timeline-item, .contact-item, .tech-stack-visual');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// 기존 키보드 접근성 함수 수정 (기술스택 지원 추가)
document.addEventListener('keydown', function(e) {
    // ESC 키로 알림 닫기 (🔥 기술스택 알림 포함)
    if (e.key === 'Escape') {
        const notification = document.querySelector('.notification, .tech-notification');
        if (notification) {
            notification.remove();
        }
    }
    
    // 엔터 키로 연락처 아이템 및 기술스택 카드 클릭
    if (e.key === 'Enter') {
        const focusedElement = document.activeElement;
        if (focusedElement && (focusedElement.classList.contains('contact-item') || focusedElement.classList.contains('tech-logo-card'))) {
            focusedElement.click();
        }
    }
});

// 개발자 콘솔 메시지 수정 (🔥 기술스택 정보 추가)
console.log('%c🛡️ 최지원 정보보안 컨설턴트', 'color: #4a90e2; font-size: 18px; font-weight: bold;');
console.log('%c기술스택: Web, Mobile, Cloud, AI, Python, JavaScript 🚀', 'color: #32cd32; font-size: 14px;');
console.log('📧 이메일 문의 환영합니다!');
console.log('💻 기술스택 카드를 클릭해보세요!');
