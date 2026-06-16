import { Locator } from '@playwright/test';

export class DateUtils {
    static async getLocatorText(locator: Locator): Promise<string> {
        return (await locator.textContent())?.trim() ?? '';
    }

    static getCurrentDate(): string {
        return new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }
}