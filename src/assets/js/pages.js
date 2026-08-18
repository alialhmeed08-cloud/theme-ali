/* ============================================================
   PhoneX — سكربتات صفحات المنتجات
   ============================================================ */
(function () {
    'use strict';

    document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
        var main = gallery.querySelector('[data-gallery-main]');
        var thumbs = Array.prototype.slice.call(gallery.querySelectorAll('[data-gallery-thumb]'));
        if (!main || thumbs.length === 0) return;

        thumbs.forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                main.src = thumb.getAttribute('data-gallery-thumb');
                thumbs.forEach(function (t) { t.classList.remove('is-active'); });
                thumb.classList.add('is-active');
            });
        });
    });

    document.querySelectorAll('[data-single-tabs]').forEach(function (wrap) {
        var tabs = Array.prototype.slice.call(wrap.querySelectorAll('[data-tab-target]'));
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) {
                    t.classList.remove('is-active');
                    var panel = document.getElementById(t.getAttribute('data-tab-target'));
                    if (panel) panel.hidden = true;
                });
                tab.classList.add('is-active');
                var active = document.getElementById(tab.getAttribute('data-tab-target'));
                if (active) active.hidden = false;
            });
        });
    });
})();
