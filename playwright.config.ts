import { defineConfig, devices } from '@playwright/test';
import path from 'path';

require('dotenv').config({
    path: path.resolve(__dirname, `.env.${process.env.TEST_ENV || 'dev'}`),
});

require('dotenv').config({
    path: path.resolve(__dirname, `.env.${process.env.TEST_ENV || 'dev'}.secret`),
    override: true,
});

const authFilePath = `.auth/${process.env.TEST_ENV || 'dev'}.json`;

export default defineConfig({
    testDir: './src/tests',
    globalSetup: './utility/global-setup.ts',
    timeout: 60_1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 2 : 2,
    reporter: [['list'], ['html', { open: 'on-failure' }]],

    use: {
        baseURL: process.env.BASE_URL,
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        actionTimeout: 30_1000,
        navigationTimeout: 30_1000,
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'setup',
            testMatch: 'src/tests/auth.setup.ts',
            use: {
                baseURL: process.env.BASE_URL,
                headless: true,
                actionTimeout: 30_1000,
                navigationTimeout: 30_1000,
            },
        },
        {
            name: 'chrome',
            use: {
                ...devices['Desktop Chrome'],
                storageState: authFilePath,
            },
            dependencies: ['setup'],
        },

        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                storageState: authFilePath,
            },
            dependencies: ['setup'],
        },
    ],
});
