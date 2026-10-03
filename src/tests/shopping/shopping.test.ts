import { test, expect } from '../../fixtures/page.fixture';
import { shoppingTestData } from '../../data/shopping.data';

test.describe('[@Feature-Shopping] Verify Shopping test scenarios', () => {
    test('[@P1 @Smoke] Verify that the customer is able to place an order with complete information', async ({ page, inventoryPage, cartPage }) => {
        // Navigate to inventory page
        await inventoryPage.navigateToInventoryPage();

        // Navigate to cart page
        await inventoryPage.navigateToCartPage();
        await expect(cartPage.itemNameInput).toHaveText(shoppingTestData.itemName);

        // Enter checkout informations
        await cartPage.enterCheckoutInformation(shoppingTestData.firstName, shoppingTestData.lastName, shoppingTestData.postalCode);
        await expect(page).toHaveURL('/checkout-step-two.html');

        // Verify checkout success message
        await cartPage.finalCheckoutStep(shoppingTestData.itemName);
        await expect(page).toHaveURL('/checkout-complete.html');
        await expect(cartPage.successMessage).toHaveText(shoppingTestData.successMessage);

        // Navigate to home page
        await expect(cartPage.backHomeButton).toBeVisible();
        await cartPage.backHomeButton.click();
        await expect(page).toHaveURL('/inventory.html');
    });

    test('[@P1 @Regression] Verify that the customer is unable to place an order with incomplete information', async ({ page, inventoryPage, cartPage }) => {
        // Navigate to inventory page
        await inventoryPage.navigateToInventoryPage();

        // Navigate to cart page
        await inventoryPage.navigateToCartPage();
        await expect(cartPage.itemNameInput).toHaveText(shoppingTestData.itemName);

        // Enter checkout informations
        await cartPage.enterCheckoutInformation(shoppingTestData.firstName, shoppingTestData.lastName, '');
        await expect(page).not.toHaveURL('/checkout-step-two.html');

        // Verify error message displayed
        await expect(cartPage.postalErrorMessage).toHaveText(shoppingTestData.postalErrorMessage);
    });
});
