# [json formatter live](https://jsonformatter.live)
json formatter live / Keyboard first, privacy-friendly, [installable](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DDesktop&hl=en) JSON editor & formatter

[![Netlify Status](https://api.netlify.com/api/v1/badges/dec0f7d7-666e-4b01-ab1e-b282a52ab6d5/deploy-status)](https://app.netlify.com/sites/jfl/deploys)

### Run the project locally
- Builds the project and starts a Docker container with nginx on port 8001
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