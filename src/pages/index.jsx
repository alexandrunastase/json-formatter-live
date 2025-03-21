import Image from 'next/image'
import React, {useState, useCallback, useEffect} from 'react'
import dynamic from 'next/dynamic'
import {EditorButtons} from '@/components/EditorButtons';

// Dynamically import CodeMirror components with no SSR
const CodeMirror = dynamic(() => import('@uiw/react-codemirror'), {ssr: false});

export default function Home() {
    const [isDark, setIsDark] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [editorRef, setEditorRef] = React.useState(null);
    const [lightTheme, setLightTheme] = React.useState(null);
    const [darkTheme, setDarkTheme] = React.useState(null);
    const [extensions, setExtensions] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    
    // Load all CodeMirror dependencies
    React.useEffect(() => {
        async function loadDependencies() {
            try {
                // Load modules
                const {createTheme} = await import('@uiw/codemirror-themes');
                const {json} = await import('@codemirror/lang-json');
                const {linter, lintGutter} = await import('@codemirror/lint');
                const {EditorView} = await import('@codemirror/view');
                const {tags} = await import('@lezer/highlight');
                const {defaultKeymap, history, historyKeymap} = await import('@codemirror/commands');
                const {keymap} = await import('@codemirror/view');
                
                // Create the extensions array directly
                const editorExtensions = [
                    json(),
                    EditorView.lineWrapping,
                    lintGutter(),
                    linter(jsonLinter, {delay: 300}),
                    keymap.of([
                        ...defaultKeymap,
                        ...historyKeymap,
                    ]),
                    history(),
                ];
                
                // Set extensions to state
                setExtensions(editorExtensions);
                
                // Create themes
                const light = createTheme({
                    dark: 'light',
                    settings: {
                        background: '#ffffff',
                        foreground: '#24292e',
                        caret: '#24292e',
                        selection: '#e9e9ed',
                        selectionMatch: '#c2dbfc',
                        gutterBackground: '#ffffff',
                        gutterForeground: '#6e7781',
                        gutterBorder: '#e1e4e8',
                        gutterActiveForeground: '#24292e',
                        lineHighlight: '#f6f8fa',
                    },
                    styles: [
                        {tag: tags.definition(tags.typeName), color: '#0550ae'},
                        {tag: tags.typeName, color: '#953800'},
                        {tag: tags.tagName, color: '#116329'},
                        {tag: tags.variableName, color: '#953800'},
                        {tag: tags.propertyName, color: '#0550ae'},
                        {tag: tags.string, color: '#0a3069'},
                        {tag: tags.comment, color: '#6e7781'},
                        {tag: tags.meta, color: '#24292e'},
                        {tag: tags.keyword, color: '#cf222e'},
                        {tag: tags.number, color: '#0550ae'},
                        {tag: tags.operator, color: '#24292e'},
                        {tag: tags.punctuation, color: '#24292e'},
                        {tag: tags.invalid, color: '#82071e'},
                        {tag: tags.link, color: '#0969da', textDecoration: 'underline'}
                    ],
                });
                
                const dark = createTheme({
                    dark: 'dark',
                    settings: {
                        background: '#18181b', // zinc-900 to match the container
                        foreground: '#c9d1d9',
                        caret: '#c9d1d9',
                        selection: '#3b4351',
                        selectionMatch: '#3b4351',
                        gutterBackground: '#18181b', // zinc-900 to match the container
                        gutterForeground: '#8b949e',
                        gutterBorder: '#27272a', // zinc-800
                        gutterActiveForeground: '#c9d1d9',
                        lineHighlight: '#27272a', // zinc-800
                    },
                    styles: [
                        {tag: tags.definition(tags.typeName), color: '#79c0ff'},
                        {tag: tags.typeName, color: '#ff7b72'},
                        {tag: tags.tagName, color: '#7ee787'},
                        {tag: tags.variableName, color: '#ffa657'},
                        {tag: tags.propertyName, color: '#79c0ff'},
                        {tag: tags.string, color: '#a5d6ff'},
                        {tag: tags.comment, color: '#8b949e'},
                        {tag: tags.meta, color: '#c9d1d9'},
                        {tag: tags.keyword, color: '#ff7b72'},
                        {tag: tags.number, color: '#79c0ff'},
                        {tag: tags.operator, color: '#c9d1d9'},
                        {tag: tags.punctuation, color: '#c9d1d9'},
                        {tag: tags.invalid, color: '#f85149'},
                        {tag: tags.link, color: '#58a6ff', textDecoration: 'underline'}
                    ],
                });
                
                setLightTheme(light);
                setDarkTheme(dark);
                setIsLoaded(true);
            } catch (error) {
                console.error("Failed to load CodeMirror dependencies:", error);
            }
        }
        
        loadDependencies();
    }, [isDark]);
    
    // Define jsonLinter function inside the component
    const jsonLinter = useCallback((view) => {
        const diagnostics = [];
        const text = view.state.doc.toString();
        if (!text.trim()) return diagnostics;
        
        try {
            JSON.parse(text);
        } catch (e) {
            // Parse the error message to get position information
            const posMatch = e.message.match(/position\s+(\d+)/i);
            const lineMatch = e.message.match(/line\s+(\d+)\s+column\s+(\d+)/i);
            
            let pos = 0;
            
            if (lineMatch) {
                // If we have line and column information
                const line = parseInt(lineMatch[1], 10) - 1; // 0-based line index
                const col = parseInt(lineMatch[2], 10) - 1;  // 0-based column index
                
                // Calculate position in the document
                const lines = text.split('\n');
                pos = 0;
                for (let i = 0; i < line; i++) {
                    pos += lines[i].length + 1; // +1 for newline
                }
                pos += col;
            } else if (posMatch) {
                // If we only have position information
                pos = parseInt(posMatch[1], 10);
            }
            
            // Find the token boundaries around the error position
            let from = Math.max(0, pos - 1);
            let to = Math.min(pos + 1, text.length);
            
            // Try to expand to include the full token
            while (from > 0 && /[^\s,\[\]{}:]/.test(text.charAt(from - 1))) from--;
            while (to < text.length && /[^\s,\[\]{}:]/.test(text.charAt(to))) to++;
            
            // Ensure we highlight at least one character
            if (from === to) to = from + 1;
            
            diagnostics.push({
                from,
                to,
                severity: 'error',
                message: e.message
            });
        }
        return diagnostics;
    }, []);
    
    
    const setEditorContent = function (view, content) {
        view.dispatch({
            changes: {
                from: 0,
                to: view.state.doc.length,
                insert: content
            }
        });
    };
    
    const handleFormat = React.useCallback(() => {
        try {
            const currentContent = editorRef.state.doc.toString();
            
            const parsed = JSON.parse(currentContent);
            const formatted = JSON.stringify(parsed, null, 2);
            
            setEditorContent(editorRef, formatted);
        } catch (e) {
            alert('Invalid JSON: ' + e.message);
        }
        
        
    }, [editorRef]);
    
    const handleMinify = React.useCallback(() => {
        try {
            // Get current content from editor
            const currentContent = editorRef.state.doc.toString();
            
            // Parse and minify the JSON
            const parsed = JSON.parse(currentContent);
            const minified = JSON.stringify(parsed);
            
            setEditorContent(editorRef, minified);
        } catch (e) {
            alert('Invalid JSON: ' + e.message);
        }
    }, [editorRef]);
    
    const handleCopy = React.useCallback(() => {
        try {
            if (editorRef) {
                const currentContent = editorRef.state.doc.toString();
                navigator.clipboard.writeText(currentContent)
                    .then(() => {
                        // Show a temporary success message
                        const copyButton = document.getElementById('copy-button');
                        if (copyButton) {
                            const originalText = copyButton.innerText;
                            copyButton.innerText = 'Copied!';
                            setTimeout(() => {
                                copyButton.innerText = originalText;
                            }, 2000);
                        }
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                        alert('Failed to copy to clipboard');
                    });
            }
        } catch (e) {
            console.error('Copy failed:', e);
            alert('Failed to copy to clipboard');
        }
    }, [editorRef]);
    
    React.useEffect(() => {
        // Check initial dark mode
        setIsDark(document.documentElement.classList.contains('dark'));
        
        // Listen for changes to dark mode
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDark(document.documentElement.classList.contains('dark'));
                }
            });
        });
        
        observer.observe(document.documentElement, {attributes: true});
        
        // Add keyboard shortcuts
        const handleKeyDown = (e) => {
            // Alt+Shift+F for format
            if (e.altKey && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                handleFormat();
            }
            // Alt+Shift+M for minify
            if (e.altKey && e.shiftKey && e.key === 'M') {
                e.preventDefault();
                handleMinify();
            }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        
        return () => {
            observer.disconnect();
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleFormat, handleMinify]);
    
    const onChange = React.useCallback((value, viewUpdate) => {
        setCode(value);
    }, []);
    const defaultValue = {
        "Hint": "JSON goes here",
        "Step 1": "Ctrl + V to paste code (it's selected by default)",
        "Step 2": "Alt + Shift + F to format",
        "Keyboard Shortcuts": {
            "Ctrl + A": "Select all text",
            "Ctrl + X": "Cut current line",
            "Alt + Shift + F": "Format",
            "Alt + Shift + M": "Minify"
        }
    };
    
    return (
        <div
            className="flex min-h-64 flex-col justify-center overflow-hidden bg-gray-50 dark:bg-zinc-800 mt-12 max-w-full transition-colors duration-150">
            <div
                className="h-full border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900 px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 dark:ring-gray-100/5 sm:rounded-lg sm:px-10 mx-6 mb-16 editor-container transition-colors duration-150 relative">
                <div className="absolute top-4 right-6 z-10">
                    <button
                        id="copy-button"
                        onClick={handleCopy}
                        disabled={!isLoaded}
                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${isLoaded ? 'text-gray-700 dark:text-gray-300 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-zinc-700' : 'text-gray-400 dark:text-gray-500 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-zinc-800 transition-colors duration-150`}
                        title="Copy to clipboard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-5 h-5 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
                        </svg>
                        Copy
                    </button>
                </div>
                <div className="w-full h-full">
                    {isLoaded && extensions ? (
                        <CodeMirror
                            autocompletion="false"
                            linenumbers="true"
                            theme={isDark ? darkTheme : lightTheme}
                            value={JSON.stringify(defaultValue, null, 2)}
                            minHeight="100%"
                            extensions={extensions}
                            onChange={onChange}
                            onCreateEditor={(editor) => {
                                setEditorRef(editor);
                                // Initialize code state with the default value
                                setCode(JSON.stringify(defaultValue, null, 2));
                                
                                // Focus on the editor and select all text
                                setTimeout(() => {
                                    editor.focus();
                                    // Select all text in the editor
                                    editor.dispatch({
                                        selection: {anchor: 0, head: editor.state.doc.length}
                                    });
                                }, 100);
                            }}
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLine: true,
                                highlightSelectionMatches: true,
                                syntaxHighlighting: true,
                                foldGutter: true,
                                dropCursor: true,
                                allowMultipleSelections: true,
                                indentOnInput: true,
                                bracketMatching: true
                            }}
                            className="max-w-full"
                            id="code-editor"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center space-y-4">
                                <div className="relative w-16 h-16 mx-auto">
                                    <div
                                        className="absolute inset-0 bg-blue-500 dark:bg-blue-400 rounded-full opacity-75 animate-ping"></div>
                                    <div
                                        className="relative rounded-full w-16 h-16 bg-blue-500 dark:bg-blue-400 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
                                             strokeLinecap="round"
                                             strokeLinejoin="round" strokeWidth="2"
                                             className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
                                        </svg>
                                    </div>
                                </div>
                                {/*<p className="text-gray-700 dark:text-gray-300 font-medium">Loading editor...</p>*/}
                            </div>
                        </div>
                    )}
                </div>
                <div className="absolute bottom-4 right-6">
                    <EditorButtons
                        onFormat={handleFormat}
                        onMinify={handleMinify}
                        onCopy={handleCopy}
                        isLoaded={isLoaded}
                    />
                </div>
            </div>
            
        </div>
    )
}
