/**
 * PhoneX — Dark / Light Theme Toggle
 * Uses theme-raed / Tailwind darkMode:'class' convention (class="dark" on <html>)
 * ✅ FIX: try/catch حول localStorage — بدونه Safari Private Mode يرمي exception ويكسر الـ JS كله
 */
const STORAGE_KEY = 'phonenx-theme';

function safeGetStorage(key) {
    try { return localStorage.getItem(key); }
    catch { return null; }
}

function safeSetStorage(key, value) {
    try { localStorage.setItem(key, value); }
    catch { /* Safari Private — silent fail */ }
}

export function initThemeToggle(scope = document) {
    const toggle = scope.querySelector('#phonenx-theme-toggle');
    const root   = document.documentElement;

    // Apply saved preference (falls back to twilight.json default already rendered server-side)
    const saved = safeGetStorage(STORAGE_KEY);
    if (saved === 'light') root.classList.remove('dark');
    if (saved === 'dark')  root.classList.add('dark');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        root.classList.toggle('dark');
        safeSetStorage(STORAGE_KEY, root.classList.contains('dark') ? 'dark' : 'light');
    });
}
