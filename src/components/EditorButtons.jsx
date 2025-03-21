import React from 'react';
import { DocumentTextIcon, DocumentMinusIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

export function EditorButtons({ onFormat, onMinify, onCopy, isLoaded = true }) {
  return (
    <div className="flex justify-end gap-2">
      <button
        onClick={onFormat}
        disabled={!isLoaded}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${isLoaded ? 'text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-700' : 'text-gray-400 dark:text-gray-500 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-zinc-800 transition-colors duration-150`}
        title="Format JSON (Alt+Shift+F)"
      >
        <DocumentTextIcon className="h-5 w-5 mr-1" />
        Format
      </button>
      <button
        onClick={onMinify}
        disabled={!isLoaded}
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${isLoaded ? 'text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-700' : 'text-gray-400 dark:text-gray-500 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-zinc-800 transition-colors duration-150`}
        title="Minify JSON (Alt+Shift+M)"
      >
        <DocumentMinusIcon className="h-5 w-5 mr-1" />
        Minify
      </button>
    </div>
  );
}
