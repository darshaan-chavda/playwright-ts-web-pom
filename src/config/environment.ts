export type TestEnvironment = 'dev' | 'uat';

const environment = process.env.TEST_ENV ?? 'dev';

if (!['dev', 'uat'].includes(environment)) {
    throw new Error(`Invalid TEST_ENV: ${environment}. Expected dev or uat.`);
}

export const testEnvironment = environment as TestEnvironment;
