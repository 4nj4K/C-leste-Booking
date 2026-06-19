document.addEventListener("DOMContentLoaded", () => {
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

    nextBtn.addEventListener('click', () => {
        let newIndex = currentIndex + 1;
        if (newIndex >= cards.length) newIndex = 0;
        updateCarousel(newIndex);
    });

    prevBtn.addEventListener('click', () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = cards.length - 1;
        updateCarousel(newIndex);
    });

    cards.forEach((card,index) => {
        card.addEventListener('click', () => {
            updateCarousel(index);
        });
    });

    updateCarousel(0);
    
});