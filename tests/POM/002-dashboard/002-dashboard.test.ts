// import { expect, test } from '@playwright/test'
import { test, expect } from '../../../fixtures/flows.fixture'
import { adminpassword, adminusername } from '../../../roles/roles'

/**
TC-DASH-01:Skeleton loading state appears on page load then data renders
1.Navigate to /bank/dashboard (must be logged in)
2.Immediately assert data-loading='true' on id='dashboard-page-container'
3.Assert skeleton placeholder elements with data-testid='skeleton-card' are visible
4.Wait for data-loading='false' on id='dashboard-page-container' (max 2s)
5.Assert data-testid='total-balance-card' is visible and contains a dollar amount
6.Assert data-testid='accounts-count-card' is visible with a numeric value
7.Assert data-testid='transactions-count-card' is visible with a numeric value
 */
test('TC-LOGIN-01:Successful login with admin credentials', async ({ Landingpage, DashboardPage, AccountPage }) => {
    await Landingpage.successfulLogin(adminusername, adminpassword);
    await DashboardPage.containerAssertion();
    await DashboardPage.checkBalance();
    await DashboardPage.accountCheck();
    await DashboardPage.totalTransaction();
});

/**
TC-DASH-02:Stat card values match actual account and transaction data
1.Log in as admin and navigate to /bank/dashboard
2.Wait for data-loading='false' on id='dashboard-page-container'
3.Read the value of data-testid='total-balance'
4.Navigate to /bank/accounts and sum all account balances from data-testid='account-balance' cells
5.Assert the dashboard total balance matches the computed sum
6.Read data-testid='accounts-count' and assert it equals the number of account rows in /bank/accounts
*/;

test('TC-DASH-02:Stat card values match actual account and transaction data', async ({ Landingpage, DashboardPage, AccountPage }) => {
    await Landingpage.successfulLogin(adminusername, adminpassword);
    await AccountPage.dashboardAccountsCount();
    await AccountPage.navigationToAccountPage();
    await AccountPage.accountRowCount();
    await DashboardPage.navigateToDashboard();
    await AccountPage.accountCountAssertion();

});


/**
TC-DASH-03:Quick Actions navigate to correct pages
1.Log in as admin and wait for dashboard to load
2.Click the 'Add Account' quick action button: data-testid='quick-add-account'
3.Assert the URL is /bank/accounts and the Add Account modal is open (data-testid='account-modal')
4.Navigate back to /bank/dashboard
5.Click 'New Transaction': data-testid='quick-new-transaction'
6.Assert URL is /bank/transactions and the New Transaction modal is open
 */

test('TC-DASH-03:Quick Actions navigate to correct pages', async ({ Landingpage, DashboardPage }) => {
    await Landingpage.successfulLogin(adminusername, adminpassword);
    await DashboardPage.addAccountAndVerifyNavigation();
    await DashboardPage.clickOnDashboard();
    await DashboardPage.addNewTransactionAndVerify();
    await DashboardPage.clickOnDashboard();

});

/**
TC-DASH-04:Recent Transactions table shows up to 5 latest transactions
1.Log in as admin and wait for dashboard to load
2.Locate the recent transactions table: data-testid='recent-transactions-table'
3.Assert the number of rows in data-testid='transactions-tbody' is between 0 and 5
4.Assert each row contains a date, type (Deposit/Withdrawal/Transfer), account name, amount, and status
5.Assert the status badge in each row shows 'Completed'
 */

test('TC-DASH-04:Recent Transactions table shows up to 5 latest transactions', async ({ Landingpage, DashboardPage }) => {

    await Landingpage.successfulLogin(adminusername, adminpassword);
    await DashboardPage.containerAssertion();
    await DashboardPage.rowsInRecentTransaction();
    await DashboardPage.rowsAssertion();

});

/**
TC-DASH-05:Pinned Accounts section supports drag-and-drop reorder
1.Log in as admin and wait for dashboard to load (requires at least 2 accounts)
2.Locate the Pinned Accounts section: data-testid='pinned-accounts-section'
3.Assert at least one card with data-testid starting with 'draggable-account-' is present
4.Assert the draggable attribute on each card is 'true'
5.Perform drag-and-drop: drag the first card and drop onto the second card position
6.Assert the drop zone container data-testid='drop-zone' had data-drop-active='true' during the drag
7.Reload the page and assert the reordered position is preserved (persisted in localStorage)
 */

test('TC-DASH-05:Pinned Accounts section supports drag-and-drop reorder', async ({ Landingpage, DashboardPage }) => {

    await Landingpage.successfulLogin(adminusername, adminpassword);
    await DashboardPage.pinnedAccountAssertion();
    await DashboardPage.dragAndDrop();
    await DashboardPage.localStorageAssertion();

});