import { Page, expect } from '@playwright/test'
import { Dashboardpage } from '../pages-objects/dashboardPage'
import { Accountpage } from '../pages-objects/accountspage'
import { addAccountUrl, dashboardUrl, newTransactionUrl } from '../../constants/urls'

export class DashboardPageCases {

    readonly page: Page;
    readonly dashboardPage: Dashboardpage;
    readonly accountPage: Accountpage;

    constructor(page: Page) {
        this.page = page;
        this.dashboardPage = new Dashboardpage(page);
        this.accountPage = new Accountpage(page);

    }

    async navigateToDashboard() {
        await this.dashboardPage.navDashboard.click();
    }
    async containerAssertion() {
        await expect(this.dashboardPage.container).toHaveAttribute('data-loading', 'true');
        await this.page.waitForTimeout(300);
        await expect(this.dashboardPage.container).toHaveAttribute('data-loading', 'false');
    }
    async checkBalance() {
        await expect(this.dashboardPage.totalBalance).toHaveText('$7,500.00');
    }
    async accountCheck() {
        await expect(this.dashboardPage.accountCount).toHaveText('2');
    }

    async totalTransaction() {
        await expect(this.dashboardPage.transCount).toHaveText('1');
    }

    async sumOfBalance() {
        const currentTotal = await this.dashboardPage.primaryCurrentAmount.textContent();
        const numericalValueCurrent = Number(currentTotal?.replace(/[$,]/g, ''));

        const savingsTotal = await this.dashboardPage.primarySavingsAmount.textContent();
        const numericalValueSavings = Number(savingsTotal?.replace(/[$,]/g, ''));

        const totalBalance = numericalValueSavings + numericalValueCurrent;

        return totalBalance;
    }

    async totalBalanceAssert() {
        const totalBalance = await this.dashboardPage.totalBalance.textContent();
        const numericValue = Number(totalBalance?.replace(/[$,]/g, ''));
        expect(await this.sumOfBalance()).toBe(numericValue);
    }

    async addAccountAndVerifyNavigation() {
        await this.dashboardPage.addAccountButton.click();
        await this.page.waitForTimeout(300)
        await expect(this.page).toHaveURL(addAccountUrl);
    }

    async clickOnDashboard() {
        await this.accountPage.closePopup.click();
        await this.dashboardPage.navDashboard.click();
        await expect(this.page).toHaveURL(dashboardUrl);
    }

    async addNewTransactionAndVerify() {
        await this.dashboardPage.addNewTransactionButton.click();
        await expect(this.page).toHaveURL(newTransactionUrl);
    }

    async rowsInRecentTransaction() {
        await this.dashboardPage.recentTransactionCount.waitFor();
        const count = await this.dashboardPage.recentTransactionCount.count();
        expect(count).toBeLessThanOrEqual(5);
    }

    async rowsAssertion() {
        const dateValue = (await this.dashboardPage.dateColumn.textContent())?.trim();
        //console.log(dateValue)
        const transactionDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        //console.log(date)
        expect(dateValue).toEqual(transactionDate);

        //typecolumn assertion
        await expect(this.dashboardPage.typeColumn).toHaveText('💰 Deposit');

        await expect(this.dashboardPage.accountColumn).toHaveText('Primary Savings');

        await expect(this.dashboardPage.amountColumn).toHaveText('+$1,000.00');

        await expect(this.dashboardPage.statusColumn).toHaveText('Completed');

    }

    async pinnedAccountAssertion() {
        await expect(this.dashboardPage.pinnedAccountPrimary).toBeVisible();
        await expect(this.dashboardPage.pinnedAccountPrimary).toHaveAttribute('draggable', 'true');
    }

    async dragAndDrop() {
        // const beforeDrag = await this.dashboardPage.pinnedAccountValue.textContent()
        await this.dashboardPage.pinnedAccountPrimary.dragTo(this.dashboardPage.dropZone);
        //await this.page.reload();
        //const afterDrag = await this.dashboardPage.pinnedAccountValue.textContent()
        //console.log(beforeDrag)
        //console.log(afterDrag)
        //expect(beforeDrag).not.toBe(afterDrag)

    }

    async localStorageAssertion() {
        const beforeStorage = await this.page.evaluate(() => {
            return localStorage.getItem('pinnedAccountsOrder')
        });
        console.log(beforeStorage)

        await this.page.reload();

        const afterStorage = await this.page.evaluate(() => {
            return localStorage.getItem('pinnedAccountsOrder')
        });
        console.log(afterStorage);
        expect(beforeStorage).toEqual(afterStorage);

    }



};
