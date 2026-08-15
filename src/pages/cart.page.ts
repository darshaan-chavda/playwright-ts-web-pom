import { Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
    readonly checkoutButton: Locator = this.page.locator('#checkout');
    readonly firstNameInput: Locator = this.page.locator('#first-name');
    readonly lastNameInput: Locator = this.page.locator('#last-name');
    readonly postalCodeInput: Locator = this.page.locator('#postal-code');
    readonly continueButton: Locator = this.page.locator('#continue');
    readonly finishButton: Locator = this.page.locator('#finish');
    readonly itemNameInput: Locator = this.page.locator('//div[@class="inventory_item_name"]');
    readonly successMessage: Locator = this.page.locator('//h2[@class="complete-header"]');
    readonly backHomeButton: Locator = this.page.locator('#back-to-products');
    readonly postalErrorMessage: Locator = this.page.locator('//h3[@data-test="error"]');

    async enterCheckoutInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.checkoutButton.click();
        await expect(this.page).toHaveURL('/checkout-step-one.html');
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finalCheckoutStep(itemName: string): Promise<void> {
        await expect(this.itemNameInput).toHaveText(itemName);
        await this.finishButton.click();
    }
}
