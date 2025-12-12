document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;
    const navLinks = document.querySelectorAll('.mobile-menu-overlay a');

    if (mobileNavToggle && mobileMenuOverlay) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            body.classList.toggle('no-scroll');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                body.classList.remove('no-scroll');
            });
        });
    }
});
