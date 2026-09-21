document.addEventListener("DOMContentLoaded", () => {
    /* --- TERAPEUTER KARUSELL --- */
    const cards = document.querySelectorAll('.therapist-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const nameText = document.getElementById('therapistName');
    const roleText = document.getElementById('therapistRole');
    const slider = document.getElementById('carouselSlider');

    let currentIndex = 0;

    function updateCarousel(index) {
        cards.forEach(card => card.classList.remove('active'));
        cards[index].classList.add('active');

        nameText.textContent = cards[index].getAttribute('data-name');
        roleText.textContent = cards[index].getAttribute('data-role');

        const cardWidth = 150;
        const gap = 20;
        const offset = -index * (cardWidth + gap);

        slider.style.transform = `translateX(${offset}px)`;
        currentIndex = index;
    }

    nextBtn?.addEventListener('click', () => {
        let newIndex = (currentIndex + 1) % cards.length;
        updateCarousel(newIndex);
    });

    prevBtn?.addEventListener('click', () => {
        let newIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel(newIndex);
    });

    cards.forEach((card, index) => {
        card.addEventListener('click', () => {
            updateCarousel(index);
        });
    });

    if (cards.length > 0) {
        updateCarousel(0);
    }

    /* --- 3D RECENSIONER KARUSELL & SWIPE --- */
    const glassCards = document.querySelectorAll('.carousel-3d .glass-card');
    const carouselContainer = document.querySelector('.carousel-3d'); // Rättat: lade till punkten för klassen

    if (!glassCards.length) return;

    let reviewIndex = 0;
    const totalGlassCards = glassCards.length;

    function updateCarousel3D() {
        glassCards.forEach((card, i) => {
            let offset = i - reviewIndex;

            // Hantera cirkulär indexering för 3 kort
            if (offset < -1) offset += totalGlassCards;
            if (offset > 1) offset -= totalGlassCards;

            if (offset === 0) {
                card.style.transform = 'translateX(0) scale(1) translateZ(0) rotateY(0deg)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
            } else if (offset === 1) {
                card.style.transform = 'translateX(60px) scale(0.95) translateZ(-60px) rotateY(-15deg)';
                card.style.opacity = '0.85';
                card.style.zIndex = '5';
            } else if (offset === -1) {
                card.style.transform = 'translateX(-60px) scale(0.95) translateZ(-60px) rotateY(15deg)';
                card.style.opacity = '0.85';
                card.style.zIndex = '5';
            }
        });
    }

    // Klick på sidokort för att aktivera dem
    glassCards.forEach((card, i) => {
        card.addEventListener('click', () => {
            reviewIndex = i;
            updateCarousel3D();
        });
    });

    // Touch-swipe logik
    let startX = 0;
    let startY = 0;
    let endX = 0;

    carouselContainer?.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    carouselContainer?.addEventListener('touchmove', (e) => {
        let currentX = e.touches[0].clientX;
        let currentY = e.touches[0].clientY;
        let diffX = Math.abs(currentX - startX);
        let diffY = Math.abs(currentY - startY);

        // Förhindra vertikal scroll om användaren swajpar horisontellt
        if (diffX > diffY) {
            e.preventDefault();
        }
    }, { passive: false });

    carouselContainer?.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const threshold = 30; // Minsta dragdistans i px
        if (startX - endX > threshold) {
            reviewIndex = (reviewIndex + 1) % totalGlassCards;
            updateCarousel3D();
        } else if (endX - startX > threshold) {
            reviewIndex = (reviewIndex - 1 + totalGlassCards) % totalGlassCards;
            updateCarousel3D();
        }
    }

    /* --- STICKY BOOKING BAR SHOW/HIDE --- */
    const stickyBar = document.getElementById('stickyBar');
    const heroSection = document.querySelector('.hero-image'); // Ändra klassnamn om din hero heter något annat

    if (stickyBar && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            
            // Om botten av Heron har skrollats förbi toppen av skärmen
            if (heroBottom < 100) {
                stickyBar.classList.add('visible');
            } else {
                stickyBar.classList.remove('visible');
            }
        });
    }

    updateCarousel3D();

    
});