/* =========================================
   SCRIPT.JS - Modern Interactions (v2)
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initNanoBanano();
    initTiltEffect();
    initSmoothScroll();

    initMagnetButtons();
});

/* -----------------------------------------
   Custom Cursor Logic
   ----------------------------------------- */


/* -----------------------------------------
   Magnetic Buttons
   ----------------------------------------- */
function initMagnetButtons() {
    // Select both buttons and nav links
    const buttons = document.querySelectorAll('.magnet-btn, .magnet-link');

    buttons.forEach(btn => {
        let rect = btn.getBoundingClientRect();

        // Update rect on enter to ensure accuracy (handling scroll/resize)
        btn.addEventListener('mouseenter', () => {
            rect = btn.getBoundingClientRect();
            // Reset transform to get clean rect if needed, though usually fine if it starts at 0
        });

        btn.addEventListener('mousemove', (e) => {
            // Use cached rect
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate distance from center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit the movement range to avoid erratic behavior
            const deltaX = (x - centerX) * 0.4;
            const deltaY = (y - centerY) * 0.4;

            btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });

        // Update rect on scroll to keep fixed elements (like navbar) accurate
        window.addEventListener('scroll', () => {
            if (getComputedStyle(btn).position === 'fixed') {
                rect = btn.getBoundingClientRect();
            }
        });
    });
}

/* -----------------------------------------
   Nano-Banano Animation Observer
   ----------------------------------------- */
function initNanoBanano() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('nano-active');
            }
        });
    }, observerOptions);

    const nanoElements = document.querySelectorAll('.nano-element');
    nanoElements.forEach(el => observer.observe(el));
}

/* -----------------------------------------
   3D Tilt Effect
   ----------------------------------------- */
function initTiltEffect() {
    const cards = document.querySelectorAll('.nano-tilt-card');

    cards.forEach(card => {
        let rect = card.getBoundingClientRect();

        card.addEventListener('mouseenter', () => {
            rect = card.getBoundingClientRect();
        });

        card.addEventListener('mousemove', (e) => {
            // Use cached rect
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // subtle tilt
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* -----------------------------------------
   Smooth Scroll
   ----------------------------------------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
