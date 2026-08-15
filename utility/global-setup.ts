import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';

export default async function globalSetup(config: FullConfig) {
    if (process.env.TEST_ENV) {
        dotenv.config({
            path: `.env.${process.env.TEST_ENV}`,
            override: true,
        });
    }
}
