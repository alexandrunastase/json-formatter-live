/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@uiw/react-codemirror',
    '@uiw/codemirror-themes',
    '@uiw/codemirror-extensions-basic-setup',
    '@codemirror/lang-javascript',
    '@codemirror/lang-json',
    '@codemirror/lint',
    '@codemirror/view',
    '@lezer/highlight',
    'codemirror'
  ],
  // Ensure we're using the new app directory features
  reactStrictMode: false,
}

module.exports = nextConfig
