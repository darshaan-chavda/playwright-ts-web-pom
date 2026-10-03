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
    timeout: 60_000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 2,
    workers: process.env.CI ? 2 : undefined,
    reporter: [['list'], ['html', { open: 'on-failure' }]],

    use: {
        baseURL: process.env.BASE_URL,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 60_1000,
        navigationTimeout: 60_1000,
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'setup',
            testMatch: `.auth/${process.env.TEST_ENV}.json`,
            use: {
                baseURL: process.env.BASE_URL,
                headless: true,
                actionTimeout: 60 * 1000,
                navigationTimeout: 60 * 1000,
            },
        },
        {
            name: 'chrome',
            use: { ...devices['Desktop Chrome'], storageState: `.auth/${process.env.TEST_ENV}.json` },
            dependencies: ['setup'],
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'], storageState: `.auth/${process.env.TEST_ENV}.json` },
            dependencies: ['setup'],
        },
    ],
});
