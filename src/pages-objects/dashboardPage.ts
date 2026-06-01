import { Page, Locator } from '@playwright/test'

export class Dashboardpage {
    readonly page: Page;
    readonly badge: Locator;
    readonly container: Locator;
    readonly totalBalance: Locator;
    readonly accountCount: Locator;
    readonly transCount: Locator;
    readonly primarySavingsAmount: Locator;
    readonly primaryCurrentAmount: Locator;
    readonly navDashboard: Locator;
    readonly addAccountButton: Locator;
    readonly addNewTransactionButton: Locator;
    readonly recentTransactionTable: Locator;
    readonly recentTransactionCount: Locator;
    readonly dateColumn: Locator;
    readonly typeColumn: Locator;
    readonly accountColumn: Locator;
    readonly amountColumn: Locator;
    readonly statusColumn: Locator;
    readonly pinnedAccountPrimary: Locator;
    //readonly pinnedAccountValue: Locator;
    readonly dropZone: Locator;
    


    constructor(page: Page) {
        this.page = page;
        this.badge = page.getByTestId('viewer-badge');
        this.container = page.locator('#dashboard-page-container');
        this.totalBalance = page.getByTestId('total-balance');
        this.accountCount = page.getByTestId('accounts-count');
        this.transCount = page.getByTestId('transactions-count');
        this.primarySavingsAmount = page.locator("#accounts-list  ").locator('p[id^="account-balance-id_"]').first();
        this.primaryCurrentAmount = page.locator("#accounts-list  ").locator('p[id^="account-balance-id_"]').nth(1);
        this.navDashboard = page.getByTestId('nav-dashboard');
        this.addAccountButton = page.getByTestId('quick-add-account');
        this.addNewTransactionButton = page.getByTestId('quick-new-transaction');
        this.recentTransactionTable = page.getByTestId('recent-transactions-table');
        this.recentTransactionCount = page.getByTestId('transactions-tbody');
        this.dateColumn = page.locator('//tbody//td').first();
        this.typeColumn = page.locator('//tbody//td').nth(1);
        this.accountColumn = page.locator('//tbody//td').nth(2);
        this.amountColumn = page.locator('//tbody//td').nth(3);
        this.statusColumn = page.locator('//tbody//td').nth(4);
        this.pinnedAccountPrimary = page.locator('[id^=pinned-account-card-id]').first();
        //this.pinnedAccountValue = page.locator('[id^=pinned-account-card-id]').first().locator('.font-semibold')
        this.dropZone = page.getByTestId('drop-zone');


    }
};