export default function initMasonry(selector) {
    const grid = document.querySelector(selector);
    if (!grid) return;

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    imagesLoaded(grid, () => {
                        new Masonry(grid, {
                            itemSelector: '.post-card',
                            columnWidth: '.post-card',
                            percentPosition: true,
                            gutter: 24
                        });

                        grid.classList.add('masonry-loaded');

                        const cards = grid.querySelectorAll('.post-card');
                        cards.forEach((card, i) => {
                            setTimeout(() => card.classList.add('animate-in'), i * 250);
                        });
                    });

                    obs.unobserve(grid);
                }
            });
        },
        { threshold: 0.1 }
    );

    observer.observe(grid);
}