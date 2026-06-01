import { Locator, Page } from '@playwright/test';

export class LoginPage {

    readonly page:Page;
    readonly userName:Locator;
    readonly password:Locator;
    readonly button:Locator;
    readonly toggle:Locator
    readonly errmessage:Locator;
    


    constructor(page:Page){
        this.page =page;
        this.userName=page.getByTestId('username-input')
        this.password=page.getByTestId('password-input')
        this.button=page.getByTestId('login-button')
        this.toggle=page.getByTestId('toggle-password-btn')
        this.errmessage=page.getByTestId('login-alert')
        
    }

}