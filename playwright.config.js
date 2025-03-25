import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3080',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chromium']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
  ],
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:3080',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
