# [json formatter live](https://jsonformatter.com)
Keyboard first, privacy-friendly, installable JSON formatter

![End-to-end tests](https://github.com/alexandrunastase/json-formatter-live/workflows/End-to-end%20tests/badge.svg?branch=main)
[![Netlify Status](https://api.netlify.com/api/v1/badges/dec0f7d7-666e-4b01-ab1e-b282a52ab6d5/deploy-status)](https://app.netlify.com/sites/jfl/deploys)

### Run the project locally
- Builds the project and starts a Docker container with nginx on port **8001**
```bash
 make run
```

### Run the project for development
- Starts Docker container and watches for file changes
```bash
 make dev
```

### Run the end to end test suite
- Starts Docker container and runs the cypress end to end tests
```bash
 make test
```

## A note on the new domain name

The `jsonformatter.com` domain doesn't belong to the owner of the repo, but was kindly pointed to the app by its owner under the following conditions:

 - Keep the code open source
 - Keep the app advertising free
 - Make sure the app is relatively maintained (TLS certificates are up-to-date, app is functional and has a decent uptime )
 
`jsonformatter.live` will continue to exist and will redirect to the new domain
 
Pro tip: If you installed the app on your computer using the `.live` domain, you will need to reinstall using the new one to get rid of the addres bar showing up at the top.