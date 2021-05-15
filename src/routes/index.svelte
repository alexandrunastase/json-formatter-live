<script lang="ts">
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Header from '$lib/components/Header.svelte';
	import About from '$lib/components/About.svelte';

	const d = new Date();
	const version = `${d.getFullYear()}_${
		d.getMonth() + 1
	}_${d.getDate()}__${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`;
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png?version={version}" />

	<link rel="apple-touch-icon" href="/images/icons/apple-touch-icon.png?version={version}" />
	<link
		rel="apple-touch-icon"
		sizes="57x57"
		href="/images/icons/apple-touch-icon-57x57.png?version='adsasd'"
	/>
	<link
		rel="apple-touch-icon"
		sizes="72x72"
		href="/images/icons/apple-touch-icon-72x72.png?version={version}"
	/>
	<link
		rel="apple-touch-icon"
		sizes="76x76"
		href="/images/icons/apple-touch-icon-76x76.png?version={version}"
	/>
	<link
		rel="apple-touch-icon"
		sizes="114x114"
		href="/images/icons/apple-touch-icon-114x114.png?version={version}"
	/>
	<link
		rel="apple-touch-icon"
		sizes="120x120"
		href="/images/icons/apple-touch-icon-120x120.png?version={version}"
	/>
	<link
		rel="apple-touch-icon"
		sizes="144x144"
		href="/images/icons/apple-touch-icon-144x144.png?version={version}"
	/>
	<link
		rel="apple-touch-icon"
		sizes="152x152"
		href="/images/icons/apple-touch-icon-152x152.png?version={version}"
	/>
	<link
		rel="apple-touch-icon"
		sizes="180x180"
		href="/images/icons/apple-touch-icon-180x180.png?version={version}"
	/>
	<link rel="manifest" href="manifest.json?version={version}" />
</svelte:head>

<main>
	<div id="app" class="mx-2 my-2 font-sans app lg:mx-2 lg:my-2">
		<Header />

		<CodeEditor />

		<footer class="px-4 py-2 mt-4 font-normal blok fixed-block">
			Minimalist installable <a class="link" href="https://jsonformatter.com/">json formatter</a
			>,editor and minifier designed to maximize productivity
		</footer>

		<About />
	</div>
</main>

<style lang="scss"></style>
