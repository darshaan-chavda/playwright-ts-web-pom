import { test, expect } from '@playwright/test';
import { Pages } from '../../pages/pages';
import * as shoppingData from './data/shoppingData.json';

// Set the environment variable to determine which test data to use
const env: string = (process.env.TEST_ENV || 'dev').toLowerCase();
const shoppingTestData: any = shoppingData[env as keyof typeof shoppingData];

test.describe('[@Feature-Shopping] Verify Shopping test scenarios', () => {
    test('[@P1 @Smoke] Verify that the customer is able to place an order with complete information', async ({ page }) => {
        const pages = Pages(page);

        // Navigate to inventory page
        await pages.inventoryPage.navigateToInventoryPage();

        // Navigate to cart page
        await pages.inventoryPage.navigateToCartPage();
        await expect(pages.cartPage.itemNameInput).toHaveText(shoppingTestData.itemName);

        // Enter checkout informations
        await pages.cartPage.enterCheckoutInformation(shoppingTestData.firstName, shoppingTestData.lastName, shoppingTestData.postalCode);
        await expect(page).toHaveURL('/checkout-step-two.html');

        // Verify checkout success message
        await pages.cartPage.finalCheckoutStep(shoppingTestData.itemName);
        await expect(page).toHaveURL('/checkout-complete.html');
        await expect(pages.cartPage.successMessage).toHaveText(shoppingTestData.messages.success);

        // Navigate to home page
        await expect(pages.cartPage.backHomeButton).toBeVisible();
        await pages.cartPage.backHomeButton.click();
        await expect(page).toHaveURL('/inventory.html');
    });

    test('[@P1 @Regression] Verify that the customer is unable to place an order with incomplete information', async ({ page }) => {
        const pages = Pages(page);

        // Navigate to inventory page
        await pages.inventoryPage.navigateToInventoryPage();

        // Navigate to cart page
        await pages.inventoryPage.navigateToCartPage();
        await expect(pages.cartPage.itemNameInput).toHaveText(shoppingTestData.itemName);

        // Enter checkout informations
        await pages.cartPage.enterCheckoutInformation(shoppingTestData.firstName, shoppingTestData.lastName, '');
        await expect(page).not.toHaveURL('/checkout-step-two.html');

        // Verify error message displayed
        await expect(pages.cartPage.postalErrorMessage).toHaveText(shoppingTestData.messages.postal);
    });
});
