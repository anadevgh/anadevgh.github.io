function initExpColumns() {
    const cols = document.querySelectorAll('.reveal-anim');
    if (!cols.length) return;

    cols.forEach(col => {
        const index = col.dataset.index || 0;
        col.style.setProperty('--delay', index);
    });

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.25,
            rootMargin: '0px 0px -10% 0px',
        }
    );

    cols.forEach(col => observer.observe(col));
}

document.addEventListener('DOMContentLoaded', () => {
    initExpColumns();

    const headings = document.querySelectorAll('.txt-anim');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
        }
    );

    headings.forEach((h) => observer.observe(h));
});