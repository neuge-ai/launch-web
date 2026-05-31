document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('.material-symbols-outlined') : null;
    let menuOpen = false;

    if (mobileMenuBtn && mobileMenuOverlay && menuIcon) {
        mobileMenuBtn.addEventListener('click', () => {
            menuOpen = !menuOpen;
            
            if (menuOpen) {
                // Open menu
                mobileMenuOverlay.classList.remove('-translate-y-2', 'opacity-0', 'pointer-events-none');
                mobileMenuOverlay.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
                menuIcon.textContent = 'close';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                // Close menu
                mobileMenuOverlay.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                mobileMenuOverlay.classList.add('-translate-y-2', 'opacity-0', 'pointer-events-none');
                menuIcon.textContent = 'menu';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
});
