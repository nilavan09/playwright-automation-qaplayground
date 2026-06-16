import { expect, Locator, Page } from '@playwright/test'
import { Accountpage } from '../pageObjects/accountspage'
import { Dashboardpage } from '../pageObjects/dashboardPage'
import { DashboardPageCases } from './dashboard'
import { accountsUrl } from '../constants/urls'
import { accountCreatedMessage, accountUpdatedMessage, accountDeletedMessage } from '../constants/messages'
import {accountData} from '../data/accountData'
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

    // -------------------- Actions --------------------
    async accountRowCount(): Promise<number> {
        this.savedRowCount = await this.accountPage.rows.count();
        return await this.accountPage.rows.count();
    }

    async fillAllFields(accountName: string, initialBalance: string) {
        await this.accountPage.accountNameInput.fill(accountName);
        await this.accountPage.accountTypeDropdown.click();
        await this.accountPage.accountTypeDropdownSelect.click();
        await this.accountPage.intialBalanceInput.fill(initialBalance);
    }

    async editButtonAccount() {
        await this.accountPage.editButton.click();
    }

    async deleteAccount() {
        await this.accountPage.deleteButton.click();
    }

    async filterAccount() {
        await this.accountPage.accountTypeFilterDropdown.click();
        await this.accountPage.accountTypeFilterDropdownSelect.click();
    }

    async filterReset() {
        await this.accountPage.filterReset.click()
    }

    // -------------------- Assertions --------------------
    async dashboardAccountsCount(): Promise<number> {
        await expect(this.dashboard.accountCount).toHaveText('2');
        const val = await this.dashboard.accountCount.textContent();
        return Number(val);
    }

    async accountCountAssertion() {
        const dashboardAccountCount = await this.dashboardAccountsCount();
        expect(this.savedRowCount).toBe(dashboardAccountCount);
    }

    async assertFilledFields() {
        await expect(this.accountPage.accountNameInput).toHaveValue(accountData.accountName);
        await expect(this.accountPage.accountTypeDropdown).toHaveText('Savings Account');
        await expect(this.accountPage.intialBalanceInput).toHaveValue(accountData.initialBalance);
        await expect(this.accountPage.statusButton).toBeChecked();
    }

    async TotalAccountCountAssertion() {
        const accountCount = Number(await this.accountPage.totalAccountCount.textContent());
        expect(accountCount).toBe(3);
    }

    async rowBadgeAssertions() {
        const rowCount = await this.accountPage.rowType.count();
        for (let i = 0; i < rowCount; i++) {
            await expect(this.accountPage.rowType.nth(i)).toHaveText('Savings');
            await expect(this.accountPage.rowType.nth(i)).not.toHaveText(['Checking', 'Credit']);
        }
    }

    async rowCountAssertionAfterReset() {
        const afterRowCount = await this.accountRowCount();
        expect(afterRowCount).toBe(this.savedRowCount);
    }

    async balanceAscending() {
        await this.accountPage.balanceColumnHeader.click();
        await expect(this.accountPage.balanceColumnHeader).toHaveAttribute('data-sort-direction', 'asc');
        const balances = await this.accountPage.accountBalance.allTextContents();
        const numbers = balances.map(v => Number(v.replace(/[$,]/g, '')));
        for (let i = 0; i < numbers.length - 1; i++) {
            expect(numbers[i]).toBeLessThan((numbers[i + 1]));
        }
    }

    async balanceDescending() {
        await this.accountPage.balanceColumnHeader.click();
        await expect(this.accountPage.balanceColumnHeader).toHaveAttribute('data-sort-direction', 'desc');
        const balances = await this.accountPage.accountBalance.allTextContents();
        const numbers = balances.map(v => Number(v.replace(/[$,]/g, '')));
        for (let i = 0; i < numbers.length - 1; i++) {
            expect(numbers[i]).toBeGreaterThan((numbers[i + 1]));
        }
    }

    async balanceNone() {
        await this.accountPage.balanceColumnHeader.click();
        await expect(this.accountPage.balanceColumnHeader).toHaveAttribute('data-sort-direction', 'none');
    }


    // -------------------- Workflows&Validations --------------------
    async navigationToAccountPage() {
        await this.accountPage.navToAccounts.click();
        await this.accountPage.rows.first().waitFor();
        await expect(this.page).toHaveURL(accountsUrl);
        await this.page.waitForTimeout(5000)
    }

    async ClickOnSaveAndAssert() {
        await this.accountPage.saveButton.click();
        const value = await this.accountPage.toastMessage.textContent();
        expect(value).toBe(accountCreatedMessage);
        await expect(this.accountPage.toastMessage).not.toBeVisible();
    }

    async editValuesAndSave() {
        await this.accountPage.accountNameInput.fill('001-Edited Account');
        await this.accountPage.saveButton.click();
        const value = await this.accountPage.toastMessage.textContent();
        expect(value).toBe(accountUpdatedMessage);
    }

    async confirmDeleteAndAssert() {
        await this.accountPage.confirmDelete.click();
        const value = await this.accountPage.toastMessage.textContent();
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








}