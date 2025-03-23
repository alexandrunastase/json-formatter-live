// Main JavaScript entry point
import '../styles/style.css';
import '../styles/editor.css';

// Theme initialization
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

// Initialize theme before page loads to prevent flash
initializeTheme();

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer if element exists
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Theme toggle functionality
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
