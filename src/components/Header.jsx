import {useState} from 'react'
import {Dialog} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import {ThemeToggle} from './ThemeToggle'
import Link from 'next/link'

const navigation = [
    {name: 'About', href: '#'},
    {name: 'Open stats', href: '#'},
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    
    return (
        <header className="text-gray-600 dark:text-gray-300 body-font bg-white dark:bg-zinc-800 transition-colors duration-150">
            <div className="container mx-auto flex p-5 flex-row items-center justify-between">
                <Link href="/" className="flex title-font font-medium items-center text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="2"
                        className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                    <span className="ml-3 text-xl dark:text-white">json formatter live</span>
                </Link>
                
                <div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}
