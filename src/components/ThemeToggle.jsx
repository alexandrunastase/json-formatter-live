import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    // Initialize theme state from localStorage or system preference
    const isDarkMode = document.documentElement.classList.contains('dark')
    setTheme(isDarkMode ? 'dark' : 'light')
  }, [])

  function toggleTheme() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    
    // Update localStorage and trigger the theme change
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem('isDarkMode', 'true')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('isDarkMode', 'false')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none border border-gray-200 dark:border-gray-700"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}
