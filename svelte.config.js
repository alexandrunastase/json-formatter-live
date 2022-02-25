import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import fs from 'fs';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			lang: 'typescript',
			style: 'postcss',
			postcss: true,
		}),
	],

	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null,
		}),
		files: {
			assets: 'static',
		},
		vite: () => ({
			plugins: [
				{
					name: 'update build version',
					buildStart() {
						const d = new Date();
						const version =
							`${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}` +
							`__${d.getHours()}_${d.getMinutes()}_${d.getSeconds()}`;
						const content = JSON.stringify({ version: version });
						fs.writeFileSync('./src/build-version.json', content);
					},
				},
			],
		}),
	},
};

export default config;
