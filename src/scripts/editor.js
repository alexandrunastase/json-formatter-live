import {EditorState} from '@codemirror/state';
import {EditorView, basicSetup} from 'codemirror';
import {json} from '@codemirror/lang-json';
import {linter, lintGutter} from '@codemirror/lint';
import {keymap} from '@codemirror/view';
import {indentWithTab} from '@codemirror/commands';
import {search, searchKeymap, SearchQuery} from '@codemirror/search';

let editorView;

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
const updateCountDisplay = (cursor, countDisplay) => {
  let count = 0;
  while (!cursor.next().done) count++;
  
  countDisplay.textContent = count ? `${count} match${count > 1 ? 'es' : ''}` : 'No matches';
  if (count === 0) {
    countDisplay.classList.add('no-match');
  } else {
    if (countDisplay.classList.contains('no-match')) {
      countDisplay.classList.remove('no-match');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const editorContainer = document.getElementById('editor-container');
  if (!editorContainer) return;
  
  const theme = EditorView.theme({
    "&": {
      backgroundColor: "#ffffff",
      color: "#000000"
    },
    ".cm-content": {
      caretColor: "#000000"
    },
    ".cm-cursor": {
      borderLeftColor: "#000000"
    },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
      backgroundColor: "rgba(100, 100, 255, 0.2)"
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(0, 0, 0, 0.05)"
    },
    ".cm-gutters": {
      backgroundColor: "#ffffff",
      color: "#1b1b1b",
      border: "none"
    },
    ".cm-gutterElement": {
      color: "#5c5c5c",
      fontWeight: "800"
    }
  });
  
  const jsonLint = linter(view => {
    const doc = view.state.doc;
    const diagnostics = [];
    try {
      JSON.parse(doc.toString());
    } catch (e) {
      if (e instanceof SyntaxError) {
        // Try to extract line and position info from the error message
        const match = /at position (\d+)/.exec(e.message);
        if (match) {
          const pos = parseInt(match[1]);
          const line = doc.lineAt(Math.min(pos, doc.length));
          diagnostics.push({
            from: line.from,
            to: line.to,
            severity: "error",
            message: e.message
          });
        } else {
          // Fallback if we can't parse the position
          diagnostics.push({
            from: 0,
            to: Math.min(100, doc.length),
            severity: "error",
            message: e.message
          });
        }
      }
    }
    return diagnostics;
  });
  
  // Use the default search extension but add a match counter
  const searchWithCount = search({
    highlightSelectionMatches: true,
    top: true,
  });
  
  
  // Function to add match count to search panel after it's created
  const addMatchCounter = EditorView.updateListener.of(update => {
    // Find the search panel if it exists
    const searchPanel = document.querySelector('.cm-search');
    if (!searchPanel) return;
    
    // Check if we need to update the count
    const shouldUpdate = update.transactions.some(tr =>
      tr.isUserEvent("input.search") ||
      tr.isUserEvent("input.searchCase") ||
      tr.isUserEvent("input.searchRegexp") ||
      tr.docChanged
    );
    
    // Also update when the panel first appears
    const isNewPanel = !searchPanel.querySelector('.cm-search-count');
    
    if (!shouldUpdate && !isNewPanel) return;
    
    // Check if we already added our counter
    let countDisplay = searchPanel.querySelector('.cm-search-count');
    if (!countDisplay) {
      // Create and add the counter element if it doesn't exist
      countDisplay = document.createElement('span');
      countDisplay.className = 'cm-search-count';
      
      // Insert after the close button
      const closeButton = searchPanel.querySelector('button[name="close"]');
      if (closeButton && closeButton.parentNode) {
        closeButton.parentNode.insertBefore(countDisplay, closeButton.nextSibling);
      }
    }
    
    // Get search input and options
    const searchInput = searchPanel.querySelector('input[name="search"]');
    if (!searchInput || !searchInput.value) {
      countDisplay.textContent = '';
      return;
    }
    
    const caseSensitive = searchPanel.querySelector('input[name="case"]')?.checked || false;
    const regexp = searchPanel.querySelector('input[name="re"]')?.checked || false;
    
    try {
      const searchQuery = new SearchQuery({
        search: searchInput.value,
        caseSensitive,
        regexp
      });
      
      const cursor = searchQuery.getCursor(update.state.doc);
      updateCountDisplay(cursor, countDisplay);
      
    } catch (e) {
      countDisplay.textContent = '';
    }
  });
  
  editorView = new EditorView({
    doc: JSON.stringify(defaultValue, null, 2),
    extensions: [
      basicSetup,
      json(),
      lintGutter(),
      jsonLint,
      theme,
      searchWithCount,
      addMatchCounter,
      EditorView.lineWrapping,
      keymap.of([indentWithTab, ...searchKeymap]),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          // Document changed
        }
      })
    ],
    parent: editorContainer
  });
  
  // Select all text initially for easy pasting
  setTimeout(() => {
    const docLength = editorView.state.doc.length;
    editorView.dispatch({
      selection: {anchor: 0, head: docLength}
    });
    editorView.focus();
  }, 100);
  
  const formatButton = document.getElementById('format-button');
  if (formatButton) {
    formatButton.addEventListener('click', formatJSON);
  }
  
  const minifyButton = document.getElementById('minify-button');
  if (minifyButton) {
    minifyButton.addEventListener('click', minifyJSON);
  }
  
  const copyButton = document.getElementById('copy-button');
  if (copyButton) {
    copyButton.addEventListener('click', copyToClipboard);
  }
  
  document.addEventListener('keydown', handleKeyDown);
});

function getEditorContent() {
  return editorView.state.doc.toString();
}

function setEditorContent(content) {
  const transaction = editorView.state.update({
    changes: {
      from: 0,
      to: editorView.state.doc.length,
      insert: content
    }
  });
  editorView.dispatch(transaction);
}

function formatJSON() {
  try {
    const currentContent = getEditorContent();
    const parsed = JSON.parse(currentContent);
    const formatted = JSON.stringify(parsed, null, 2);
    setEditorContent(formatted);
  } catch (e) {
    console.error(e);
    const formatButton = document.getElementById('format-button');
    formatButton.classList.add('wiggle');
    setTimeout(() => {
      formatButton.classList.remove('wiggle');
    }, 600); // Remove class after animation completes
  }
}

function minifyJSON() {
  try {
    const currentContent = getEditorContent();
    const parsed = JSON.parse(currentContent);
    const minified = JSON.stringify(parsed);
    setEditorContent(minified);
  } catch (e) {
    console.error(e);
    const minifyButton = document.getElementById('minify-button');
    minifyButton.classList.add('wiggle');
    setTimeout(() => {
      minifyButton.classList.remove('wiggle');
    }, 600); // Remove class after animation completes
  }
}

function copyToClipboard() {
  try {
    const currentContent = getEditorContent();
    navigator.clipboard.writeText(currentContent)
      .then(() => {
        const copyButton = document.getElementById('copy-button');
        const originalText = copyButton.innerHTML;
        copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mr-1"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>Copied!';
        setTimeout(() => {
          copyButton.innerHTML = originalText;
        }, 1000);
      })
      .catch((e) => {
        console.error('Copy failed:', e);
        const copyButton = document.getElementById('copy-button');
        copyButton.classList.add('wiggle');
        setTimeout(() => {
          copyButton.classList.remove('wiggle');
        }, 600); // Remove class after animation completes
      });
  } catch (e) {
    console.error('Copy failed:', e);
    const copyButton = document.getElementById('copy-button');
    copyButton.classList.add('wiggle');
    setTimeout(() => {
      copyButton.classList.remove('wiggle');
    }, 600); // Remove class after animation completes
  }
}

function handleKeyDown(e) {
  // Intercept browser search (Ctrl+F or Cmd+F)
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault();
    openSearch();
  }
  
  // Alt+Shift+F for format
  if (e.altKey && e.shiftKey && e.key === 'F') {
    e.preventDefault();
    formatJSON();
  }
  // Alt+Shift+M for minify
  if (e.altKey && e.shiftKey && e.key === 'M') {
    e.preventDefault();
    minifyJSON();
  }
}

function openSearch() {
  // This will trigger CodeMirror's search panel
  const searchCommand = searchKeymap.find(k => k.key === "Mod-f")?.run;
  if (searchCommand) {
    searchCommand(editorView);
    
    // Force an update to show match count immediately
    const checkAndUpdatePanel = () => {
      const searchPanel = document.querySelector('.cm-search');
      
      if (searchPanel) {
        const searchInput = searchPanel.querySelector('input[name="search"]');
        if (searchInput) {
          // Make sure our counter is added
          let countDisplay = searchPanel.querySelector('.cm-search-count');
          if (!countDisplay) {
            countDisplay = document.createElement('span');
            countDisplay.className = 'cm-search-count';
            
            const closeButton = searchPanel.querySelector('button[name="close"]');
            if (closeButton && closeButton.parentNode) {
              closeButton.parentNode.insertBefore(countDisplay, closeButton.nextSibling);
            }
          }
          
          // Trigger an input event to update the count
          searchInput.dispatchEvent(new Event('input'));
          
          // Also listen for future input events
          searchInput.addEventListener('input', () => {
            try {
              if (!searchInput.value) {
                countDisplay.textContent = '';
                return;
              }
              
              const caseSensitive = searchPanel.querySelector('input[name="case"]')?.checked || false;
              const regexp = searchPanel.querySelector('input[name="re"]')?.checked || false;
              
              const searchQuery = new SearchQuery({
                search: searchInput.value,
                caseSensitive,
                regexp
              });
              
              const cursor = searchQuery.getCursor(editorView.state.doc);
              updateCountDisplay(cursor, countDisplay);
            } catch (e) {
              countDisplay.textContent = '';
            }
          });
        }
      } else {
        // If panel isn't ready yet, try again in a bit
        setTimeout(checkAndUpdatePanel, 50);
      }
    };
    
    // Start checking for the panel
    setTimeout(checkAndUpdatePanel, 50);
  }
}

export {formatJSON, minifyJSON, copyToClipboard};
