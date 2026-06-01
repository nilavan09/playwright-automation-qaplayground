import { test as base, expect } from '@playwright/test';
import { LoginPageCases } from '../src/testcases/login';

type loginfixtures = {
    Landingpage: LoginPageCases
}


export const test = base.extend<loginfixtures>({

    Landingpage: async ({ page }, use) => {
        const logincase = new LoginPageCases(page)
        await logincase.goto()
        await use(logincase)
    }

})

export { expect }