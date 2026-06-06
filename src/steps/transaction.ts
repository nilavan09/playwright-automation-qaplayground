import { expect, Page } from '@playwright/test';
import { TransactionPage } from '../pages-objects/transactionpage'
import { Accountpage } from '../pages-objects/accountspage'
import { transactionsUrl } from '../../constants/urls'
import { transactionsExportedMessage } from '../../constants/messages'

export class TransactionPageCases {

    readonly page: Page;
    readonly transactionPage: TransactionPage;
    readonly AccountpageLocators: Accountpage;

    initialBalance: number = 0;
    intialRowCount: number = 0;

    constructor(page: Page) {
        this.page = page;
        this.transactionPage = new TransactionPage(page);
        this.AccountpageLocators = new Accountpage(page);

    }

    // -------------------- Actions --------------------
    async primaryAccountBalance() {
        const val = await this.AccountpageLocators.accountBalance.nth(1).allTextContents()
        return Number(val[0].replace(/[$,]/g, ''));
    }

    async saveInitialBalance() {
        this.initialBalance = await this.primaryAccountBalance();
        console.log('initialBalance:', this.initialBalance);
    }

    async fillTransactionForm() {
        await this.transactionPage.transactionType.click();
        await this.transactionPage.transactionTypeSelect.click();
        await this.transactionPage.transactionFromAccountSelect.click();
        await this.transactionPage.transactionFromAccountSelectValue.click();
        await this.transactionPage.transactionAmmount.fill('500');
        await this.transactionPage.transactionSaveButton.click();
    }

    async accountFilterSelection() {
        await this.transactionPage.accountFilter.click();
        await this.transactionPage.accountFilterSelection.click();
        await this.transactionPage.applyButton.click();
    }

    // -------------------- Assertions --------------------
    async primaryAccountBalanceAssertion() {
        const newBalance = await this.primaryAccountBalance();
        expect(newBalance).toBe(this.initialBalance + 500);
        console.log('newBalance:', newBalance);
    }

    async transactionAccouuntRowAssertion() {
        const rowCount = await this.transactionPage.accountRows.count();
        for (let i = 0; i < rowCount; i++) {
            await expect(this.transactionPage.accountRows.nth(i)).toHaveText('Primary Savings');
        }
    }

    async transactionCount() {
        const transactionCount = await this.transactionPage.transactionBody.count();
        return transactionCount;
    }

    async saveIntialTransactionCount() {
        this.intialRowCount = await this.transactionCount();
        console.log(this.intialRowCount);
    }

    async filterAssertionAfterReset() {
        await this.page.waitForTimeout(200)
        const afterAdddingAccount = await this.transactionCount();
        console.log(afterAdddingAccount);
        expect(this.intialRowCount).not.toBe(afterAdddingAccount);
    }

    // -------------------- Workflows & Validations --------------------
    async navigationToTransactionPage() {
        await this.transactionPage.transactionPageNav.click();
        await expect(this.page).toHaveURL(transactionsUrl);
    }



    async downloadAndAssertDownloaded() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.transactionPage.exportExcel.click();
        await expect(this.transactionPage.transactionToast).toHaveText(transactionsExportedMessage);
        const download = await downloadPromise;
        const fileName = download.suggestedFilename();
        expect(fileName).toMatch(/\.csv$/);
        console.log('Downloaded file:', fileName);
    }

    async transactionIDLinkAndAssertions() {
        await this.transactionPage.transactionID.first().click()
        await expect(this.page).toHaveURL(/\/bank\/transactions\/id_.+/)

        await expect(this.transactionPage.breadcrumbOne).toHaveText('Dashboard');
        await expect(this.transactionPage.breadcrumbTwo).toHaveText('Transactions');

        await expect(this.transactionPage.transactionIDType).toBeVisible();
        await expect(this.transactionPage.transactionDetailAmount).toBeVisible();
        await expect(this.transactionPage.transactionDetailDatetime).toBeVisible();
        await expect(this.transactionPage.transactionDetailAccountLink).toBeVisible();
        await expect(this.transactionPage.transactionDetailBalanceAfter).toBeVisible();
        await expect(this.transactionPage.transactionDetailStatus).toBeVisible();
    }

    async navigateBackFromTransactionPage() {
        await this.transactionPage.transactionIDBackButton.click();
        await expect(this.page).toHaveURL(transactionsUrl)
    }



}