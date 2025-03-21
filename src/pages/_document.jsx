import {Head, Html, Main, NextScript} from 'next/document'
import React from "react"

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

const serviceWorkerScript = `
                if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
                        .then(registration => {
                            console.log('Service worker registered with scope:', registration.scope);
                        })
                        .catch(error => console.error('Service worker registration failed:', error));
                });
            }`;
export default function Document() {
    return (
        <Html className="h-full antialiased" lang="en">
            <Head>
                <script dangerouslySetInnerHTML={{__html: modeScript}}/>
                <script dangerouslySetInnerHTML={{__html: serviceWorkerScript}}/>
                
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`}
                />
                <link rel="manifest" href="/pwa/manifest.json"/>
                <meta name="theme-color" content="#3b82f6"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
                <meta name="apple-mobile-web-app-title" content="JSON Formatter"/>
                <link rel="apple-touch-icon" href="/pwa/images/icon-192.png"/>
                <link
                    rel="alternate"
                    type="application/feed+json"
                    href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`}
                />
                <script
                    defer
                    data-domain="jsonformatter.com"
                    src="https://plausible.io/js/plausible.js"
                />
            
            </Head>
            <body
                className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors duration-150">
            <Main/>
            <NextScript/>
            </body>
        </Html>
    )
}
