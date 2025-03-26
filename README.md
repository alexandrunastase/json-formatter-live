# [json formatter](https://jsonformatter.com)

Keyboard first, privacy-friendly, installable JSON formatter and editor

![End-to-end tests](https://github.com/alexandrunastase/json-formatter-live/actions/workflows/tests.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/dec0f7d7-666e-4b01-ab1e-b282a52ab6d5/deploy-status)](https://app.netlify.com/sites/jfl/deploys)

### Run the project for development

- Serves app in development mode on http://localhost:3001

```bash
 npm run dev
```

### Run the project in production mode

- Build static files and serves app in production mode using Docker image on http://localhost:3080

```bash
 npm run build && npm run preview
```

### Run the end-to-end playwright test suite

```bash
 npm run test
```

## A note on the domain name

The `jsonformatter.com` domain doesn't belong to the owner of the repo, but was kindly pointed to the app by its owner
under the following conditions:

- Keep the code open source
- Keep the app advertising free
- Make sure the app is relatively maintained (No harmful security issues and app is functional and has a decent uptime )

`jsonformatter.live` will continue to exist and will redirect to the new domain
