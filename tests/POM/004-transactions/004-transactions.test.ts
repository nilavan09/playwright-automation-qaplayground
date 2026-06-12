import { test, expect } from '../../../fixtures/flows.fixture'
import { roles } from '../../../roles/roles'


test.beforeEach('login Process', async ({ Landingpage }) => {
    await Landingpage.successfulLogin(roles.admin.username, roles.admin.password);
});

// test.afterEach('Closing Browser', async ({ page }) => {
//     await page.close();
// });

/**
TC-TXN-01:Create a deposit transaction and verify balance update
1.Log in as admin and navigate to /bank/accounts — note the balance of 'Primary Savings'
2.Navigate to /bank/transactions
3.Click 'New Transaction': data-testid='new-transaction-button'
4.Assert the transaction modal is open: data-testid='account-modal'
5.Select 'Deposit' as the transaction type
6.Select 'Primary Savings' as the account: data-testid='from-account-select'
7.Enter '500' in the Amount field and click Submit
8.Assert a success toast appears and the new transaction row appears in the table
9.Navigate back to /bank/accounts and assert Primary Savings balance increased by $500
*/
//#region Testcase:1 
test('TC-TXN-01:Create a deposit transaction and verify balance update', async ({ Landingpage, DashboardPage, AccountPage, TransactionPage }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await AccountPage.navigationToAccountPage();
    await TransactionPage.saveInitialBalance()
    await TransactionPage.navigationToTransactionPage();
    await DashboardPage.navigateToDashboard()
    await DashboardPage.addNewTransactionAndVerify()
    await TransactionPage.fillTransactionForm()
    await AccountPage.navigationToAccountPage();
    await TransactionPage.primaryAccountBalanceAssertion()
});

/**
TC-TXN-02:Filter transactions by account and verify only matching rows appear
1.Log in as admin and navigate to /bank/transactions
2.Note the total transaction count in data-testid='transactions-tbody'
3.Open the Account filter: data-testid='filter-account-select'
4.Select a specific account (e.g., 'Primary Savings')
5.Click Apply Filters: data-testid='apply-filters-button'
6.Assert every row in the table shows 'Primary Savings' in the Account column
7.Click Reset: data-testid='reset-filters-button' and assert all rows return
 */
//#region Testcase:2
test('TC-TXN-02:Filter transactions by account and verify only matching rows appear', async ({ Landingpage, DashboardPage, TransactionPage }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await TransactionPage.navigationToTransactionPage();
    await TransactionPage.saveInitialTransactionCount();
    await DashboardPage.navigateToDashboard()
    await DashboardPage.addNewTransactionAndVerify()
    await TransactionPage.fillTransactionForm()
    await TransactionPage.accountFilterSelection();
    await TransactionPage.transactionAccouuntRowAssertion();
    await TransactionPage.filterAssertionAfterReset();

});

/**
TC-TXN-03:Export transactions as CSV and verify file is downloaded
1.Log in as admin and navigate to /bank/transactions with at least one transaction present
2.Click the Export button: data-testid='export-button' or aria-label='Export transactions as CSV'
3.Assert a success toast 'Transactions exported successfully!' appears
4.Verify the browser triggers a file download with a .csv extension
5.Navigate to /bank/transactions when no transactions exist (reset data)
6.Click Export and assert a toast error 'No transactions to export' appears
 */
//#region Testcase:3
test('TC-TXN-03:Export transactions as CSV and verify file is downloaded', async ({ Landingpage, TransactionPage }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await TransactionPage.navigationToTransactionPage();
    await TransactionPage.downloadAndAssertDownloaded();

});

/**
TC-TXN-04:Open transaction detail page and verify all fields via breadcrumb navigation
1.Log in as admin and navigate to /bank/transactions
2.Click a Transaction ID link in the table: data-testid='transaction-id-link'
3.Assert the URL changes to /bank/transactions/{id}
4.Assert the breadcrumb: data-testid='breadcrumb-item-1' = 'Dashboard', data-testid='breadcrumb-item-2' = 'Transactions'
5.Assert the transaction type, amount, date, account, balance-after, and status are all visible
6.Click the Back button: data-testid='back-button'
7.Assert the browser navigates back to /bank/transactions
 */
//#region Testcase:4
test('TC-TXN-04:Open transaction detail page and verify all fields via breadcrumb navigation', async ({ Landingpage, TransactionPage }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await TransactionPage.navigationToTransactionPage();
    await TransactionPage.transactionIDLinkAndAssertions();
    await TransactionPage.navigateBackFromTransactionPage();

});