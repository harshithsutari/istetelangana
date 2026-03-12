// Lightweight slideshow functionality (vanilla JS)
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('#homeSlider');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.carousel-inner .item'));
    const indicators = Array.from(slider.querySelectorAll('.slider-indicators li'));
    const prevBtn = slider.querySelector('.slider-control.prev');
    const nextBtn = slider.querySelector('.slider-control.next');
    let current = slides.findIndex(s => s.classList.contains('active'));
    if (current === -1) current = 0;
    let timer = null;

    function show(index) {
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
        current = index;
    }

    function next() { show((current + 1) % slides.length); }
    function prev() { show((current - 1 + slides.length) % slides.length); }

    // Wire controls
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.preventDefault(); pause(); next(); });
    if (prevBtn) prevBtn.addEventListener('click', function (e) { e.preventDefault(); pause(); prev(); });

    // Indicators
    indicators.forEach((ind, i) => ind.addEventListener('click', function () { pause(); show(i); }));

    function start() { timer = setInterval(next, 4000); }
    function pause() { if (timer) { clearInterval(timer); timer = null; } }

    // Start auto-rotation
    start();

    // Pause on mouse over
    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', function () { if (!timer) start(); });
});
