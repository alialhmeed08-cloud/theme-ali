import { initCountdown } from"./partials/phonenx-countdown";
document.addEventListener("DOMContentLoaded", () => {
    initCountdown(document);
    document.querySelectorAll(".tab-trigger").forEach(btn => {
        btn.addEventListener("click", () => {
            const wrap = document.getElementById(btn.dataset.componentId);
            if (!wrap) return;
            wrap.querySelectorAll(".tab-trigger").forEach(b => b.classList.toggle("is-active", b === btn));
            wrap.querySelectorAll(".tabs-wrapper > div").forEach(tab => {
                const on = tab.id === btn.dataset.target;
                tab.classList.toggle("is-active", on);
                tab.style.display = on ?"" :"none";
            });
        });
    });
});
