import { testEnvironment } from '../config/environment';

type LoginData = {
    invalidUsername: string;
    invalidPassword: string;
    loginErrorMessage: string;
};

const loginData: Record<'dev' | 'uat', LoginData> = {
    dev: {
        invalidUsername: 'user_123',
        invalidPassword: 'password_123',
        loginErrorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
    uat: {
        invalidUsername: 'user_123',
        invalidPassword: 'password_123',
        loginErrorMessage: 'Epic sadface: Username and password do not match any user in this service',
    },
};

export const loginTestData = loginData[testEnvironment];
