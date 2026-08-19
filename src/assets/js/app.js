/* ============================================================
   PhoneX — Theme Scripts (Vanilla JS)
   ============================================================ */
(function () {
    'use strict';

    var cfg = window.px_settings || {};
    var doc = document;

    function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
    function $all(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

    var toastWrap = null;
    function toast(message, type) {
        if (!toastWrap) {
            toastWrap = doc.createElement('div');
            toastWrap.className = 'px-toast-wrap';
            doc.body.appendChild(toastWrap);
        }
        var el = doc.createElement('div');
        el.className = 'px-toast px-toast--' + (type || 'success');
        el.textContent = message;
        toastWrap.appendChild(el);
        setTimeout(function () {
            el.classList.add('is-leaving');
            setTimeout(function () { el.remove(); }, 320);
        }, 2600);
    }
    window.PhonexToast = toast;

    if (cfg.stickyHeader) {
        window.addEventListener('scroll', function () {
            doc.body.classList.toggle('is-scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    var burger = $('[data-px-burger]');
    var drawer = $('[data-px-drawer]');
    var overlay = $('[data-px-overlay]');

    function setDrawer(open) {
        if (!drawer) return;
        drawer.classList.toggle('is-open', open);
        drawer.setAttribute('aria-hidden', String(!open));
        if (burger) {
            burger.classList.toggle('is-open', open);
            burger.setAttribute('aria-expanded', String(open));
        }
        if (overlay) overlay.hidden = !open;
        doc.body.style.overflow = open ? 'hidden' : '';
    }
    if (burger) burger.addEventListener('click', function () { setDrawer(!drawer.classList.contains('is-open')); });
    if (overlay) overlay.addEventListener('click', function () { setDrawer(false); });
    var drawerClose = $('[data-px-drawer-close]');
    if (drawerClose) drawerClose.addEventListener('click', function () { setDrawer(false); });
    $all('.px-drawer__menu a').forEach(function (a) {
        a.addEventListener('click', function () { setDrawer(false); });
    });

    var searchPanel = $('[data-px-search-panel]');
    $all('[data-px-search-open]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (!searchPanel) return;
            var isHidden = searchPanel.hidden;
            searchPanel.hidden = !isHidden;
            if (isHidden) {
                var input = searchPanel.querySelector('input');
                if (input) setTimeout(function () { input.focus(); }, 150);
            }
        });
    });

    $all('.px-marquee__track').forEach(function (track) {
        if (track.dataset.cloned) return;
        track.innerHTML += track.innerHTML;
        track.dataset.cloned = '1';
    });

    $all('[data-px-tabs]').forEach(function (group) {
        var tabs = $all('.px-tab', group);
        var gridId = group.getAttribute('data-px-tabs');
        var grid = doc.getElementById(gridId);
        if (!grid) return;
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('is-active'); });
                tab.classList.add('is-active');
                var filter = tab.getAttribute('data-filter') || 'all';
                $all('.px-card', grid).forEach(function (card) {
                    var brands = (card.getAttribute('data-brands') || '').split(',');
                    var show = filter === 'all' || brands.indexOf(filter) !== -1;
                    card.style.display = show ? '' : 'none';
                });
            });
        });
    });

    function pad(n) { return String(n).padStart(2, '0'); }
    $all('[data-countdown]').forEach(function (box) {
        var until = new Date(box.getAttribute('data-countdown').replace(' ', 'T'));
        if (isNaN(until.getTime())) return;
        var hEl = $('[data-cd-h]', box), mEl = $('[data-cd-m]', box), sEl = $('[data-cd-s]', box);
        function tick() {
            var diff = until.getTime() - Date.now();
            if (diff <= 0) {
                if (hEl) hEl.textContent = '00';
                if (mEl) mEl.textContent = '00';
                if (sEl) sEl.textContent = '00';
                clearInterval(timer);
                return;
            }
            var h = Math.floor(diff / 3600000);
            var m = Math.floor((diff % 3600000) / 60000);
            var s = Math.floor((diff % 60000) / 1000);
            if (hEl) hEl.textContent = pad(h);
            if (mEl) mEl.textContent = pad(m);
            if (sEl) sEl.textContent = pad(s);
        }
        tick();
        var timer = setInterval(tick, 1000);
    });

    $all('[data-hero]').forEach(function (hero) {
        var slides = $all('.px-hero__slide', hero);
        var thumbs = $all('.px-hero__thumb', hero);
        if (slides.length < 2) return;
        var current = 0, auto;
        function go(i) {
            current = (i + slides.length) % slides.length;
            slides.forEach(function (s, idx) { s.classList.toggle('is-active', idx === current); });
            thumbs.forEach(function (t, idx) { t.classList.toggle('is-active', idx === current); });
        }
        thumbs.forEach(function (t, idx) {
            t.addEventListener('click', function () { go(idx); restart(); });
        });
        function restart() {
            clearInterval(auto);
            auto = setInterval(function () { go(current + 1); }, 5000);
        }
        go(0); restart();
    });

    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        $all('.reveal').forEach(function (el) { io.observe(el); });
    } else {
        $all('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    }

    if (cfg.cardZoom) doc.body.classList.add('px-sticky-zoom');

    $all('[data-px-newsletter]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var input = form.querySelector('input[type="email"]');
            if (!input || !input.value || input.value.indexOf('@') === -1) {
                toast('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            toast('تم الاشتراك بنجاح — شكراً لك! 🎉', 'success');
            form.reset();
        });
    });

    $all('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

    var path = window.location.pathname.replace(/^\/|\/$/g, '');
    $all('.px-bottom-nav__item').forEach(function (item) {
        var href = (item.getAttribute('href') || '').replace(/^\/|\/$/g, '');
        if (href === path || (path === '' && href === '')) item.classList.add('is-active');
    });
})();


/**
 * PhoneX — Global App Entry
 * theme-raed app.js pattern: runs on ALL pages.
 * Theme toggle + progress bar must work globally (not just home).
 */
import { initThemeToggle } from "./partials/phonenx-theme-toggle";
import { initScrollEffects } from "./partials/phonenx-scroll";

// theme-raed global init (keeps original global behaviors)
// — the original app.js imports/helpers remain unchanged —

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle(document);
    initScrollEffects(document);
});