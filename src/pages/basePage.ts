import { Page, expect } from '@playwright/test';

export class BasePage {
    // Playwright page instance used to interact with the browser.
    constructor(protected readonly page: Page) {
        this.page = page;
    }

    // Navigates to the specified URL and waits until the HTML document has been loaded.
    async navigate(url: string): Promise<void> {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }
}
