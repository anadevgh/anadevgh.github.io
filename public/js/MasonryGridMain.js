export default function initMasonry(selector) {
    const grid = document.querySelector(selector);
    if (!grid) return;

    // Wait until images are loaded before initializing Masonry
    imagesLoaded(grid, () => {
        new Masonry(grid, {
            itemSelector: '.post-card',
            columnWidth: '.post-card',
            percentPosition: true,
            gutter: 24,
        });

        grid.classList.add('masonry-loaded');

        // Animate cards
        const cards = grid.querySelectorAll('.post-card');
        cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('animate-in'), i * 150);
        });
    });
}