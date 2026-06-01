import { Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly togglePasswordButton: Locator;
    readonly errorMessage: Locator;



    constructor(page: Page) {
        this.page = page;
        this.userName = page.getByTestId('username-input');
        this.password = page.getByTestId('password-input');
        this.loginButton = page.getByTestId('login-button');
        this.togglePasswordButton = page.getByTestId('toggle-password-btn');
        this.errorMessage = page.getByTestId('login-alert');

    }

};