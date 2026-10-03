import { testEnvironment } from '../config/environment';

type UserData = {
    standard_username: string;
    standard_password: string;
};
const userData: Record<'dev' | 'uat', UserData> = {
    dev: {
        standard_username: 'standard_user',
        standard_password: process.env.PASSWORD!,
    },
    uat: {
        standard_username: '',
        standard_password: process.env.PASSWORD!,
    },
};

export const userTestData = userData[testEnvironment];
