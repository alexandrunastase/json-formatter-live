import '../styles/style.css';
import '../styles/editor.css';
const initializeTheme = () => {
    const isDarkMode = localStorage.getItem('isDarkMode') === 'true' ||
        (localStorage.getItem('isDarkMode') === null &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
};

// Initialize theme before page loads to prevent flash of incorrect theme
initializeTheme();

document.addEventListener('DOMContentLoaded', function () {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = document.documentElement.classList.contains('dark');
            
            if (isDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('isDarkMode', 'false');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('isDarkMode', 'true');
            }
        });
    }
});
