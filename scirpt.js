/* ===========================================
   기술스택 카드 스타일 (기존 styles.css 맨 끝에 추가)
   =========================================== */

/* 기존 visual-card 스타일을 유지하면서 tech-stack-card 추가 */
.tech-stack-card {
    background: white;
    border-radius: 20px;
    padding: 3rem 2rem;
    box-shadow: var(--shadow-medium);
    border: 1px solid var(--border-color);
    text-align: center;
    max-width: 350px;
    transform: rotate(3deg);
    transition: transform 0.3s ease;
}

.tech-stack-card:hover {
    transform: rotate(0deg) translateY(-5px);
    box-shadow: var(--shadow-strong);
}

.tech-header {
    margin-bottom: 1.5rem;
}

.tech-header .header-icon {
    width: 60px;
    height: 60px;
    background: var(--bg-soft);
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    border: 2px solid var(--border-color);
}

.tech-header .header-icon i {
    font-size: 1.8rem;
    color: var(--primary-color);
}

.tech-header h3 {
    color: var(--text-dark);
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
}

.tech-header p {
    color: var(--text-medium);
    font-size: 0.9rem;
    margin: 0;
}

.tech-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
    margin-bottom: 1.5rem;
}

.tech-item {
    background: var(--bg-light);
    border: 1px solid var(--border-color);
    border-radius: 10px;
    padding: 0.8rem 0.5rem;
    transition: all 0.3s ease;
    cursor: pointer;
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.tech-item:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: var(--shadow-light);
    background: white;
    border-color: var(--primary-color);
}

.tech-item:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

.tech-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    margin-bottom: 0.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    transition: all 0.3s ease;
}

/* 기술별 색상 */
.tech-icon.web {
    background: linear-gradient(135deg, #61dafb, #21759b);
}

.tech-icon.mobile {
    background: linear-gradient(135deg, #a4c639, #6a8c3a);
}

.tech-icon.cloud {
    background: linear-gradient(135deg, #ff9900, #232f3e);
}

.tech-icon.ai {
    background: linear-gradient(135deg, #ff6b35, #9b59b6);
}

.tech-icon.python {
    background: linear-gradient(135deg, #3776ab, #ffd43b);
}

.tech-icon.js {
    background: linear-gradient(135deg, #f7df1e, #323330);
}

.tech-name {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--text-dark);
    margin: 0;
}

.tech-footer {
    text-align: center;
    padding-top: 1rem;
    border-top: 1px solid var(--border-light);
}

.tech-footer .experience-badge {
    display: inline-flex;
    align-items: center;
    background: var(--primary-color);
    color: white;
    padding: 0.4rem 1rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

/* 기술스택 알림 */
.tech-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    color: var(--text-dark);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-size: 14px;
    z-index: 9999;
    border: 2px solid var(--primary-color);
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.2);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 320px;
    line-height: 1.4;
}

.tech-notification .notification-header {
    font-weight: 600;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.tech-notification .notification-body {
    color: var(--text-medium);
    font-size: 0.9rem;
}

/* 모바일 반응형 */
@media (max-width: 768px) {
    .tech-stack-card {
        transform: none;
        margin-top: 2rem;
        padding: 2rem 1.5rem;
        max-width: none;
    }
    
    .tech-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 0.6rem;
    }
    
    .tech-icon {
        width: 28px;
        height: 28px;
        font-size: 1rem;
    }
    
    .tech-name {
        font-size: 0.65rem;
    }
    
    .tech-header h3 {
        font-size: 1.1rem;
    }
    
    .tech-notification {
        right: 10px;
        left: 10px;
        max-width: none;
        transform: translateY(-100%);
    }
}
