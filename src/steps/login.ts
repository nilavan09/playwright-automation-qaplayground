
import { expect, Page } from '@playwright/test';
import { LoginPage } from '../pages-objects/loginPage';
import { Dashboardpage } from '../pages-objects/dashboardPage';
import { baseBankUrl, dashboardUrl } from '../../constants/urls';
import { invalidCredentialsMessage } from '../../constants/messages';

export class LoginPageCases {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly dashboardPage: Dashboardpage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new Dashboardpage(page);
    }

    // -------------------- Actions --------------------
    async navigateTo() {
        await this.page.goto(baseBankUrl);
    }

    private async login(username: string, password: string) {
        await this.loginPage.userName.fill(username);
        await this.loginPage.password.waitFor({ state: 'visible' });
        await this.loginPage.password.fill(password);
    }

    // -------------------- Assertions --------------------
    async togglePasswordVisibility(password: string) {
        await this.loginPage.password.waitFor({ state: 'visible' });
        await this.loginPage.password.fill(password);
        await expect(this.loginPage.password).toHaveAttribute('type', 'password');
        await this.loginPage.togglePasswordButton.click();
        await expect(this.loginPage.password).toHaveAttribute('type', 'text');
        await this.loginPage.togglePasswordButton.click();
        await expect(this.loginPage.password).toHaveAttribute('type', 'password');
    }

    async readOnlyRole() {
        await expect(this.page).toHaveURL(dashboardUrl);
        await expect(this.dashboardPage.badge).toHaveText('Read-only');
    }

    // -------------------- Workflows&Validations --------------------
    async successfulLogin(username: string, password: string) {
        await this.login(username, password);
        await this.loginPage.loginButton.click();
        await expect(this.page).toHaveURL(dashboardUrl);
    }

    async failedLogin(username: string, password: string) {
        await this.login(username, password);
        await this.loginPage.loginButton.click();
        await expect(this.loginPage.errorMessage).toContainText(invalidCredentialsMessage);
    }

    async withEnterButton(username: string, password: string) {
        await this.login(username, password);
        await this.loginPage.password.press('Enter');
        await expect(this.page).toHaveURL(dashboardUrl);
    }

};