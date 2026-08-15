import { defineConfig, devices } from '@playwright/test';
import path from 'path';

require('dotenv').config({
    path: path.resolve(__dirname, `.env.${process.env.TEST_ENV || 'dev'}`),
});

require('dotenv').config({
    path: path.resolve(__dirname, `.env.${process.env.TEST_ENV || 'dev'}.secret`),
    override: true,
});

export default defineConfig({
    testDir: './src/tests',
    globalSetup: './utility/global-setup.ts',
    timeout: 90 * 1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['html', { open: 'on-failure' }]],

    use: {
        baseURL: process.env.BASE_URL,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 90 * 1000,
        navigationTimeout: 90 * 1000,
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'setup',
            testMatch: 'src/tests/auth.setup.ts',
            use: {
                baseURL: process.env.BASE_URL,
                headless: true,
                actionTimeout: 60 * 1000,
                navigationTimeout: 60 * 1000,
            },
        },
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'], storageState: 'auth.json' },
            dependencies: ['setup'],
        },

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        //   dependencies: ['setup'],

        // },
    ],
});
