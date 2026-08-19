/**
 * PhoneX — Dark / Light Theme Toggle
 * Uses theme-raed / Tailwind darkMode:'class' convention (class="dark" on <html>)
 * Persists choice in localStorage.
 */
const STORAGE_KEY = 'phonenx-theme';

export function initThemeToggle(scope = document) {
    const toggle = scope.querySelector('#phonenx-theme-toggle');
    const root = document.documentElement;

    // Apply saved preference (falls back to twilight.json default already rendered server-side)
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light') root.classList.remove('dark');
    if (saved === 'dark')  root.classList.add('dark');

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        root.classList.toggle('dark');
        localStorage.setItem(STORAGE_KEY, root.classList.contains('dark') ? 'dark' : 'light');
    });
}