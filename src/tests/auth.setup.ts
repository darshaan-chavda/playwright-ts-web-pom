import path from 'path';
import { test as setup, expect } from '@playwright/test';
import { Pages } from '../pages/pages';

const authFilePath = path.resolve(process.cwd(), 'auth.json');

setup('authenticate', async ({ page }) => {
    const pages = Pages(page);
    await pages.loginPage.gotoLoginPage();
    await pages.loginPage.loginWithCredentials(process.env.USERNAME!, process.env.PASSWORD!);
    await expect(page).toHaveURL('/inventory.html');

    // Store the auth session
    await page.context().storageState({ path: authFilePath });
});
