"use strict";

document.addEventListener("DOMContentLoaded", function() {
    initializeEditor();
});

function initializeEditor() {
    window.jsonlint = jsonlint;

    const editorElement = document.getElementById("code-editor");

    const defaultJson = {
        "Hint": "JSON goes here",
        "Step 1": "Ctrl + V to paste code (it's selected by default)",
        "Step 2": "Alt + Shift + F to format",
        "Keyboard Shortcuts": {
            "Ctrl + A": "Select all text",
            "Ctrl + D": "Delete current line",
            "Ctrl + X": "Cut current line",
            "Alt + F": "Toggle fold (cursor after start bracket)",
            "Alt + Shift + F": "Format",
            "Alt + Shift + M": "Minify",
        }
    };

    const codeEditor = CodeMirror(
        editorElement, {
            lineNumbers: true,
            value: JSON.stringify(defaultJson),
            mode: "application/json",
            autoCloseBrackets: true,
            foldGutter: true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
            lint: true,
            indentUnit: 2,
            lineWrapping: true,
            autofocus: true,
            spellcheck: false,
            autocapitalize: false,
            screenReaderLabel: "json formatter",
            extraKeys: {
                "Shift-Alt-M": (codeMirror) => codeEditor.setValue(minifyJson(codeMirror.getValue())),
                "Shift-Alt-F": (codeMirror) => codeEditor.setValue(formatJson(codeMirror.getValue())),
                "Alt-F": (codeMirror) => codeMirror.foldCode(codeMirror.getCursor())
            }
        }

    );

    window.codeEditor = codeEditor;

    codeEditor.setValue(formatJson(codeEditor.getValue()));
    codeEditor.execCommand("selectAll");

    document.onkeydown = (e) => {
        if (e.ctrlKey && e.code === "KeyS") {
            e.preventDefault();
            return;
        }
        if (e.altKey && e.shiftKey && e.key === "F") {
            e.preventDefault();
            codeEditor.setValue(formatJson(codeEditor.getValue()));
        }

        if (e.altKey && e.shiftKey && e.key === "M") {
            e.preventDefault();
            codeEditor.setValue(minifyJson(codeEditor.getValue()));
        }

        if (e.ctrlKey && e.code === "KeyA") {
            e.preventDefault();
            codeEditor.execCommand("selectAll");
            codeEditor.focus();
        }
    };
}

window.codeEditor = function() {
    return {
        format() {
            window.codeEditor.setValue(formatJson(codeEditor.getValue()));
        },
        minify() {
            window.codeEditor.setValue(minifyJson(codeEditor.getValue()));
        },
        copy() {
            codeEditor.execCommand("selectAll");
            codeEditor.focus();

            document.execCommand("copy");
        }
    };
};

window.formatJson = function(text) {
    let object = JSON.parse(unescape(text));
    return JSON.stringify(object, null, 2);
};

window.minifyJson = function(text) {
    let object = JSON.parse(unescape(text));
    return JSON.stringify(object, null, 0);
};