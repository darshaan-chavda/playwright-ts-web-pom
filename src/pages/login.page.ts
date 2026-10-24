import { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    readonly userName: Locator = this.page.getByLabel('Username');
    readonly password: Locator = this.page.getByLabel('Password');
    readonly loginButton: Locator = this.page.locator('#login-button');
    readonly errorMessage: Locator = this.page.locator('[data-test="error"]');

    async gotoLoginPage(): Promise<void> {
        await this.navigate('/');
    }

    async loginWithCredentials(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.loginButton.click();
    }
}
