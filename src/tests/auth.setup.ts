import { test as setup, expect } from '../fixtures/page.fixture';
import { userTestData } from '../data/users';
const authFilePath = `.auth/${process.env.TEST_ENV}.json`;

setup('authenticate', async ({ loginPage, page }) => {
    await loginPage.gotoLoginPage();
    await loginPage.loginWithCredentials(userTestData.standard_username, userTestData.standard_password);
    await expect(page).toHaveURL('/inventory.html');

    // Store the auth session
    await page.context().storageState({ path: authFilePath });
});
