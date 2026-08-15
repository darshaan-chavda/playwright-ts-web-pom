import { BasePage } from './basePage';
import { expect, Locator } from '@playwright/test';

export class InventoryPage extends BasePage {
    readonly burgerMenu: Locator = this.page.locator('//button[@id="react-burger-menu-btn"]');
    readonly allItemsOption: Locator = this.page.locator('//a[text()="All Items"]');
    readonly aboutOption: Locator = this.page.locator('//a[text()="About"]');
    readonly logoutOption: Locator = this.page.locator('//a[text()="Logout"]');
    readonly resetAppStateOption: Locator = this.page.locator('//a[text()="Reset App State"]');
    readonly burgerMenuClose: Locator = this.page.locator('//button[@id="react-burger-cross-btn"]');
    readonly addCartBackpackButton: Locator = this.page.locator('//button[@id="add-to-cart-sauce-labs-backpack"]');
    readonly cartButton: Locator = this.page.locator('//div[@id="shopping_cart_container"]');

    async navigateToInventoryPage(): Promise<void> {
        await this.navigate('/inventory.html');
        await this.page.waitForLoadState('domcontentloaded');
    }
    async logoutUser(): Promise<void> {
        await this.burgerMenu.click();
        await this.logoutOption.click();
    }

    async navigateToCartPage(): Promise<void> {
        await this.addCartBackpackButton.click();
        await this.cartButton.click();
        await expect(this.page).toHaveURL('/cart.html');
    }
}
