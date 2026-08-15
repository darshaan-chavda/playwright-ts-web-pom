import { Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
    readonly userName: Locator = this.page.locator('//input[@id="user-name"]');
    readonly password: Locator = this.page.locator('//input[@id="password"]');
    readonly loginButton: Locator = this.page.locator('//input[@id="login-button"]');
    readonly errorMessage: Locator = this.page.locator('//h3[@data-test="error"]');

    async gotoLoginPage(): Promise<void> {
        await this.navigate('/');
    }

    async loginWithCredentials(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
