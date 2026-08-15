import { Page } from '@playwright/test';
import { LoginPage } from './loginPage';
import { InventoryPage } from './inventoryPage';
import { CartPage } from './cartPage';

export const Pages = (page: Page) => {
    return {
        loginPage: new LoginPage(page),
        inventoryPage: new InventoryPage(page),
        cartPage: new CartPage(page),
    };
};
