    document.addEventListener('DOMContentLoaded', () => {
        const newsCards = document.querySelectorAll('.news-card');

        newsCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hovered');
            });

            card.addEventListener('mouseleave', () => {
                card.classList.remove('hovered');
            });
        });
    });