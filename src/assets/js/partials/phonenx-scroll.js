/**
 * PhoneX — Scroll behaviors:
 *   1. Top progress bar (#phonenx-progress)
 *   2. Nav .scrolled state (#phonenx-nav)
 *   3. Scroll-spy for nav links
 *   4. ✅ Reveal observer for .reveal elements (كان مفقوداً — CSS يستخدم .visible لكن JS لم يضيفها)
 * Pure Vanilla JS — theme-raed app-helper style.
 */
export function initScrollEffects(scope = document) {
    const progress = scope.querySelector('#phonenx-progress');
    const nav      = scope.querySelector('#phonenx-nav');

    function onScroll() {
        // 1. Progress bar
        if (progress) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            progress.style.width = percent + '%';
        }

        // 2. Nav scrolled state
        if (nav) {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load

    // 3. Scroll spy
    initScrollSpy(scope);

    // 4. ✅ Reveal observer
    initReveal(scope);
}

function initScrollSpy(scope) {
    const sections = scope.querySelectorAll('section[id]');
    const navLinks = scope.querySelectorAll('.nav-links a[href^="#"], .phonenx-mobile-nav a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === '#' + id;
                    link.classList.toggle('on', isActive);
                    link.classList.toggle('is-active', isActive);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => observer.observe(section));
}

/**
 * ✅ Reveal Observer — يراقب عناصر .reveal ويضيف .visible عند ظهورها
 * مطلوب لـ px-card و px-review و px-feature التي تعتمد على هذه الـ class في CSS
 */
function initReveal(scope) {
    const elements = scope.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // مرة واحدة كافية
            }
        });
    }, { rootMargin: '0px 0px -60px 0px' });

    elements.forEach(el => observer.observe(el));
}
