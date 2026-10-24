import { BasePage } from './base.page';
import { expect, Locator } from '@playwright/test';

export class InventoryPage extends BasePage {
    readonly burgerMenu: Locator = this.page.locator('#react-burger-menu-btn');
    readonly allItemsOption: Locator = this.page.getByText('All Items');
    readonly aboutOption: Locator = this.page.getByText('About');
    readonly logoutOption: Locator = this.page.getByText('Logout');
    readonly resetAppStateOption: Locator = this.page.getByText('Reset App State');
    readonly burgerMenuClose: Locator = this.page.locator('#react-burger-cross-btn');
    readonly addCartBackpackButton: Locator = this.page.locator('#add-to-cart-sauce-labs-backpack');
    readonly cartButton: Locator = this.page.locator('#shopping_cart_container');

    async navigateToInventoryPage(): Promise<void> {
        await this.navigate('/inventory.html');
        await this.page.waitForLoadState('domcontentloaded');
    }
    async logoutUser(): Promise<void> {
        await this.burgerMenu.click();
        await this.logoutOption.isVisible();
        await this.logoutOption.click();
    }

    async navigateToCartPage(): Promise<void> {
        await this.addCartBackpackButton.click();
        await this.cartButton.click();
        await expect(this.page).toHaveURL('/cart.html');
    }
}
