import { Page } from '@playwright/test';
import { LoginPage } from './login.page';
import { InventoryPage } from './inventory.page';
import { CartPage } from './cart.page';

export const Pages = (page: Page) => {
    return {
        loginPage: new LoginPage(page),
        inventoryPage: new InventoryPage(page),
        cartPage: new CartPage(page),
    };
};
