/**
 * PhoneX — Deal Countdown Timer
 * Reads deadline from #phonenx-countdown[data-deadline]
 * Pure Vanilla JS — follows theme-raed app-helper style (no new deps)
 */
export function initCountdown(scope = document) {
    const timer = scope.querySelector('#phonenx-countdown');
    if (!timer || !timer.dataset.deadline) return;

    const elHours   = timer.querySelector('#cd-hours');
    const elMinutes = timer.querySelector('#cd-minutes');
    const elSeconds = timer.querySelector('#cd-seconds');
    if (!elHours || !elMinutes || !elSeconds) return;

    const deadline = new Date(timer.dataset.deadline).getTime();
    const pad = n => String(n).padStart(2, '0');

    function tick() {
        const now  = Date.now();
        let diff = Math.max(0, deadline - now);

        const hours   = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        elHours.textContent   = pad(hours);
        elMinutes.textContent = pad(minutes);
        elSeconds.textContent = pad(seconds);

        if (diff <= 0) clearInterval(interval);
    }

    tick();
    const interval = setInterval(tick, 1000);
}