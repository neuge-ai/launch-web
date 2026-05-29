// scroll-effects.js
document.addEventListener('DOMContentLoaded', () => {
    // Set initial value
    document.documentElement.style.setProperty('--scroll-offset', window.scrollY);
    
    // Update on scroll
    document.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll-offset', window.scrollY);
    }, { passive: true });
});
