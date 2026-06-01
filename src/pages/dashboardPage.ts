import { Page, Locator } from '@playwright/test'

export class Dashboardpage {
    readonly page: Page;
    readonly badge: Locator
    readonly container: Locator
    readonly totalbalance: Locator
    readonly acccountcount: Locator
    readonly transcount: Locator
    readonly primarySavingsAmount: Locator
    readonly primaryCurrentAmount: Locator
    readonly navdashboard:Locator

    constructor(page: Page) {
        this.page = page
        this.badge = page.getByTestId('viewer-badge')
        this.container = page.locator('#dashboard-page-container')
        this.totalbalance = page.getByTestId('total-balance')
        this.acccountcount = page.getByTestId('accounts-count')
        this.transcount = page.getByTestId('transactions-count')
        this.primarySavingsAmount = page.locator("#accounts-list  ").locator('p[id^="account-balance-id_"]').first()
        this.primaryCurrentAmount = page.locator("#accounts-list  ").locator('p[id^="account-balance-id_"]').nth(1)
        this.navdashboard = page.getByTestId('nav-dashboard')
    }

}