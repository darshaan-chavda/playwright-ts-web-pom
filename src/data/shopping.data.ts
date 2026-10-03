import { testEnvironment } from '../config/environment';

type ShoppingData = {
    firstName: string;
    lastName: string;
    postalCode: string;
    itemName: string;
    postalErrorMessage: string;
    successMessage: string;
};
const shoppingData: Record<'dev' | 'uat', ShoppingData> = {
    dev: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '90001',
        itemName: 'Sauce Labs Backpack',
        postalErrorMessage: 'Error: Postal Code is required',
        successMessage: 'Thank you for your order!',
    },
    uat: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '90001',
        itemName: 'Sauce Labs Backpack',
        postalErrorMessage: 'Error: Postal Code is required',
        successMessage: 'Thank you for your order!',
    },
};

export const shoppingTestData = shoppingData[testEnvironment];
