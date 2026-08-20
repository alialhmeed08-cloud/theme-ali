/**
 * PhoneX — home.js
 * يعمل مع salla.onReady (لا DOMContentLoaded)
 * يتعامل مع نظامين مختلفين من الـ tabs:
 *   1. px-tab + data-filter + data-brands  → فلتر المنتجات بالبراند
 *   2. .tab-trigger + data-target           → تبديل panels (featured/categories)
 */
import { initCountdown } from "./partials/phonenx-countdown";

salla.onReady(() => {

    // ===== Deal Countdown =====
    initCountdown(document);

    // ===== 1. Brand Filter Tabs (px-tab / data-filter) =====
    // phonex-products.twig يستخدم هذا النظام
    document.querySelectorAll('[data-px-tabs]').forEach(tabGroup => {
        const targetId = tabGroup.dataset.pxTabs;
        const grid     = document.getElementById(targetId);
        if (!grid) return;

        const cards = grid.querySelectorAll('[data-brands]');

        tabGroup.querySelectorAll('.px-tab').forEach(btn => {
            btn.addEventListener('click', () => {
                // تحديث الـ active state
                tabGroup.querySelectorAll('.px-tab').forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');

                const filter = btn.dataset.filter;

                cards.forEach(card => {
                    const brands = card.dataset.brands || '';
                    const show   = filter === 'all' || brands === filter;
                    card.style.display = show ? '' : 'none';
                    // إعادة تشغيل الـ reveal animation للعناصر الظاهرة
                    if (show) {
                        card.classList.remove('visible');
                        requestAnimationFrame(() => card.classList.add('visible'));
                    }
                });
            });
        });
    });

    // ===== 2. Panel Tabs (.tab-trigger / data-target) =====
    // featured-products وcategories يستخدمان هذا النظام من theme-raed
    document.querySelectorAll('.tab-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const wrap = document.getElementById(btn.dataset.componentId);
            if (!wrap) return;

            wrap.querySelectorAll('.tab-trigger').forEach(b => {
                b.classList.toggle('is-active', b === btn);
            });

            wrap.querySelectorAll('.tabs-wrapper > div').forEach(tab => {
                const on = tab.id === btn.dataset.target;
                tab.classList.toggle('is-active', on);
                tab.style.display = on ? '' : 'none';
            });
        });
    });

});
