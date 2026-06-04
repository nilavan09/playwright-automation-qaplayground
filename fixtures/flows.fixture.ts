import { test as base, expect } from '@playwright/test';
import { LoginPageCases } from '../src/steps/login';
import { DashboardPageCases } from '../src/steps/dashboard';
import { AccountPageCases } from '../src/steps/accounts';
import { TransactionPageCases } from '../src/steps/transaction';

type FlowFixtures = {
    Landingpage: LoginPageCases;
    DashboardPage: DashboardPageCases;
    AccountPage: AccountPageCases;
    TransactionPage: TransactionPageCases;
};

export const test = base.extend<FlowFixtures>({
    Landingpage: async ({ page }, use) => {
        const login = new LoginPageCases(page);
        await login.navigateTo();
        await use(login);
    },

    DashboardPage: async ({ page }, use) => {
        const dashboard = new DashboardPageCases(page);
        await use(dashboard);
    },

    AccountPage: async ({ page }, use) => {
        const accounts = new AccountPageCases(page);
        await use(accounts);
    },

    TransactionPage: async ({ page }, use) => {
        const tx = new TransactionPageCases(page);
        await use(tx);
    }
});

export { expect };