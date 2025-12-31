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

    // Team Slider Logic
    const slider = document.querySelector('.team-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && prevBtn && nextBtn) {
        const getScrollAmount = () => {
            const card = slider.querySelector('.team-card');
            if (!card) return 300;
            // Get card width + gap (gap is 30px from CSS)
            return card.offsetWidth + 30;
        };

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }
});
