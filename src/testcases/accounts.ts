import { expect, Locator, Page } from '@playwright/test'
import { Accountpage } from '../pages-objects/accountspage'
import { Dashboardpage } from '../pages-objects/dashboardPage'
import { DashboardPageCases } from './dashboard'
import { accountsUrl } from '../../constants/urls'
import { accountCreatedMessage, accountUpdatedMessage, accountDeletedMessage } from '../../constants/messages'
import { table } from 'node:console'

export class AccountPageCases {
    page: Page;
    accountPage: Accountpage;
    dashboard: Dashboardpage;
    dashboardcases: DashboardPageCases;


    savedRowCount: number = 0;

    constructor(page: Page) {

        this.page = page;
        this.accountPage = new Accountpage(page);
        this.dashboard = new Dashboardpage(page);
        this.dashboardcases = new DashboardPageCases(page);

    }

    async navigationToAccountPage() {
        await this.accountPage.navToAccounts.click();
        await this.accountPage.rows.first().waitFor();
        await expect(this.page).toHaveURL(accountsUrl);
        await this.page.waitForTimeout(5000)
    }

    async accountRowCount(): Promise<number> {
        this.savedRowCount = await this.accountPage.rows.count();
        return await this.accountPage.rows.count();
        //console.log(this.savedRowCount)

    }

    async dashboardAccountsCount(): Promise<number> {
        await expect(this.dashboard.accountCount).toHaveText('2');
        const val = await this.dashboard.accountCount.textContent();
        return Number(val);
    }
    async accountCountAssertion() {
        // const accountPageRowCount = await this.accountRowCount();
        const dashboardAccountCount = await this.dashboardAccountsCount();

        //expect(this.savedRowCount).toEqual(2);
        expect(this.savedRowCount).toBe(dashboardAccountCount);

    }

    async fillAllFields(accountName: string, initialBalance: string) {
        await this.accountPage.accountNameInput.fill(accountName);
        await this.accountPage.accountTypeDropdown.click();
        await this.accountPage.accountTypeDropdownSelect.click();
        await this.accountPage.intialBalanceInput.fill(initialBalance);

    }

    async assertFilledFields() {
        await expect(this.accountPage.accountNameInput).toHaveValue('001-Test Account');
        await expect(this.accountPage.accountTypeDropdown).toHaveText('Savings Account');
        await expect(this.accountPage.intialBalanceInput).toHaveValue('1000');
        await expect(this.accountPage.statusButton).toBeChecked();

    }

    async ClickOnSaveAndAssert() {
        await this.accountPage.saveButton.click();
        const value = await this.accountPage.toastMessage.textContent();
        //console.log(value)
        expect(value).toBe(accountCreatedMessage);
        await expect(this.accountPage.toastMessage).not.toBeVisible();
    }

    async TotalAccountCountAssertion() {
        const accountCount = Number(await this.accountPage.totalAccountCount.textContent());
        expect(accountCount).toBe(3);

    }

    async editButtonAccount() {
        await this.accountPage.editButton.click();
    }

    async editValuesAndSave() {
        //await this.page.waitForTimeout(300)
        await this.accountPage.accountNameInput.fill('001-Edited Account');
        await this.accountPage.saveButton.click();

        const value = await this.accountPage.toastMessage.textContent();
        //console.log(value)
        expect(value).toBe(accountUpdatedMessage);
    }

    async deleteAccount() {
        await this.accountPage.deleteButton.click();
    }

    async confirmDeleteAndAssert() {
        await this.accountPage.confirmDelete.click();

        const value = await this.accountPage.toastMessage.textContent();
        //console.log(value)
        expect(value).toBe(accountDeletedMessage);

        await expect(this.accountPage.accountName).toHaveText('Checking Account')

    }

    async createAcccount() {
        await this.dashboardcases.addAccountAndVerifyNavigation()
        await this.fillAllFields('001-Test Account', '1000');
        await this.assertFilledFields();
        await this.ClickOnSaveAndAssert();
        await this.TotalAccountCountAssertion();
    }

    async filterAccount() {
        await this.accountPage.accountTypeFilterDropdown.click();
        await this.accountPage.accountTypeFilterDropdownSelect.click();
    }

    async rowBadgeAssertions() {


        const rowCount = await this.accountPage.rowType.count();

        //console.log(rowCount);
        for (let i = 0; i < rowCount; i++) {
            await expect(this.accountPage.rowType.nth(i)).toHaveText('Savings');
            //console.log(this.accountPage.rowType.nth(i));
            await expect(this.accountPage.rowType.nth(i)).not.toHaveText(['Checking', 'Credit']);
        }
    }

    async filterReset() {
        await this.accountPage.filterReset.click()
    }


    async rowCountAssertionAfterReset() {


        const afterRowCount = await this.accountRowCount();


        expect(afterRowCount).toBe(this.savedRowCount);
        //console.log(this.savedRowCount)
    }

    async balanceAscending() {
        await this.accountPage.balanceColumnHeader.click();
        await expect(this.accountPage.balanceColumnHeader).toHaveAttribute('data-sort-direction', 'asc');
        //console.log(await this.accountPage.accountBalance.allTextContents());

        const balances = await this.accountPage.accountBalance.allTextContents();

        const numbers = balances.map(v => Number(v.replace(/[$,]/g, '')));

        for (let i = 0; i < numbers.length - 1; i++) {
            expect(numbers[i]).toBeLessThan((numbers[i + 1]));
        }

        //console.log(numbers)

    }
    async balanceDescending() {
        await this.accountPage.balanceColumnHeader.click();
        await expect(this.accountPage.balanceColumnHeader).toHaveAttribute('data-sort-direction', 'desc');
        //console.log(await this.accountPage.accountBalance.allTextContents());

        const balances = await this.accountPage.accountBalance.allTextContents();

        const numbers = balances.map(v => Number(v.replace(/[$,]/g, '')));

        for (let i = 0; i < numbers.length - 1; i++) {
            expect(numbers[i]).toBeGreaterThan((numbers[i + 1]));
        }

        //console.log(numbers)

    }

    async balanceNone() {
        await this.accountPage.balanceColumnHeader.click();

        await expect(this.accountPage.balanceColumnHeader).toHaveAttribute('data-sort-direction', 'none');

    }








}