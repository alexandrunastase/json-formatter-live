<script lang="typescript">
	import { onMount } from 'svelte';

	let codeEditor;

	const formatJson = (text: string): string => {
		let object = JSON.parse(unescape(text));
		return JSON.stringify(object, null, 2);
	};

	const minifyJson = (text: string): string => {
		let object = JSON.parse(unescape(text));
		return JSON.stringify(object, null, 0);
	};

	const copyEditorContent = (): void => {
		codeEditor.execCommand('selectAll');
		codeEditor.focus();

		document.execCommand('copy');
	};

	onMount(() => {
		(async () => {
			const editorElement = document.getElementById('code-editor');

			const defaultJson = {
				Hint: 'JSON goes here',
				'Step 1': "Ctrl + V to paste code (it's selected by default)",
				'Step 2': 'Alt + Shift + F to format',
				'Keyboard Shortcuts': {
					'Ctrl + A': 'Select all text',
					'Ctrl + D': 'Delete current line',
					'Ctrl + X': 'Cut current line',
					'Alt + F': 'Toggle fold (cursor after start bracket)',
					'Alt + Shift + F': 'Format',
					'Alt + Shift + M': 'Minify',
				},
			};

			codeEditor = CodeMirror(editorElement, {
				lineNumbers: true,
				value: JSON.stringify(defaultJson),
				mode: 'application/json',
				autoCloseBrackets: true,
				foldGutter: true,
				gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
				lint: true,
				indentUnit: 2,
				lineWrapping: true,
				autofocus: true,
				spellcheck: false,
				autocapitalize: false,
				screenReaderLabel: 'json formatter',
				extraKeys: {
					'Shift-Alt-M': (codeMirror) => codeEditor.setValue(minifyJson(codeMirror.getValue())),
					'Shift-Alt-F': (codeMirror) => codeEditor.setValue(formatJson(codeMirror.getValue())),
					'Alt-F': (codeMirror) => codeMirror.foldCode(codeMirror.getCursor()),
				},
			});

			codeEditor.setValue(formatJson(codeEditor.getValue()));
			codeEditor.execCommand('selectAll');

			document.onkeydown = (e) => {
				if (e.ctrlKey && e.code === 'KeyS') {
					e.preventDefault();
					return;
				}
				if (e.altKey && e.shiftKey && e.key === 'F') {
					e.preventDefault();
					codeEditor.setValue(formatJson(codeEditor.getValue()));
				}

				if (e.altKey && e.shiftKey && e.key === 'M') {
					e.preventDefault();
					codeEditor.setValue(minifyJson(codeEditor.getValue()));
				}

				if (e.ctrlKey && e.code === 'KeyA') {
					e.preventDefault();
					codeEditor.execCommand('selectAll');
					codeEditor.focus();
				}
			};
		})();
	});
</script>

<div id="code-editor" class="relative w-full mt-1">
	<div class="absolute right-0 z-10 mt-6 mr-6 top-2">
		<button on:click={() => copyEditorContent(codeEditor.getValue())} class="flex blok copy button">
			<svg
				class="w-5 mr-2"
				viewBox="0 0 20 20"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<path
					d="M0,8.00585866 C0,6.89805351 0.897060126,6 2.00585866,6 L11.9941413,6 C13.1019465,6 14,6.89706013 14,8.00585866 L14,17.9941413 C14,19.1019465 13.1029399,20 11.9941413,20 L2.00585866,20 C0.898053512,20 0,19.1029399 0,17.9941413 L0,8.00585866 L0,8.00585866 Z M6,8 L2,8 L2,18 L12,18 L12,14 L15,14 L15,12 L18,12 L18,2 L8,2 L8,5 L6,5 L6,8 L12,8 L12,14 L17.9941413,14 C19.1029399,14 20,13.1019465 20,11.9941413 L20,2.00585866 C20,0.897060126 19.1019465,0 17.9941413,0 L8.00585866,0 C6.89706013,0 6,0.898053512 6,2.00585866 L6,8 Z"
				/>
			</svg>
			<span class="flex align-middle">copy</span>
		</button>
	</div>

	<div class="absolute bottom-0 right-0 z-10 flex mb-2 mr-6">
		<button
			title="Alt+Shift+F"
			on:click={() => codeEditor.setValue(formatJson(codeEditor.getValue()))}
			class="flex format blok button bottom action"
		>
			<svg class="w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
				<defs />
				<path d="M1 1h18v2H1V1zm0 8h18v2H1V9zm0 8h18v2H1v-2zM1 5h12v2H1V5zm0 8h12v2H1v-2z" />
			</svg>
			format
		</button>
		<button
	     	title="Alt+Shift+M"
			on:click={() => codeEditor.setValue(minifyJson(codeEditor.getValue()))}
			class="flex minify blok button bottom action"
		>
			<svg
				class="w-5 mr-2"
				viewBox="0 0 20 20"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<path
					d="M1,1 L19,1 L19,3 L1,3 L1,1 Z M1,9 L19,9 L19,11 L1,11 L1,9 Z M1,17 L19,17 L19,19 L1,19 L1,17 Z M1,5 L19,5 L19,7 L1,7 L1,5 Z M1,13 L19,13 L19,15 L1,15 L1,13 Z"
				/>
			</svg>
			minify
		</button>
	</div>
</div>

<style lang="scss" global>
	@import './editor.scss';
</style>
