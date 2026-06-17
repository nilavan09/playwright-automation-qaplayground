// import { expect, test } from '@playwright/test'
import { accountData } from '../../src/data/accountData';
import { test, expect } from '../../src/fixtures/flows.fixture'
import { roles } from '../../src/roles/roles'


test.beforeEach('login Process', async ({ Landingpage }) => {
    await Landingpage.successfulLogin(roles.admin.username, roles.admin.password);
});

// test.afterEach('Closing Browser', async ({ page }) => {
//     await page.close();
// });

/**
TC-ACC-01:Create a new account using the 3-step Open Account wizard
1.Log in as admin and navigate to /bank/accounts
2.Click 'Add Account': - Dashboard Page.
3.Fill all required field.
4.Assert all filed fields.
5.Click the Save Account Button and assert the toast message.
7.Verify that total accounts count on account page.
*/
//#region Testcase:1    
test('TC-ACC-01:11Create a new account using the 3-step Open Account wizard @smoke @sanity @regression', async ({ Landingpage, DashboardPage, AccountPage, page }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await DashboardPage.addAccountAndVerifyNavigation();
    await AccountPage.fillAllFields(accountData.accountName, accountData.initialBalance);
    await AccountPage.assertFilledFields();
    await AccountPage.ClickOnSaveAndAssert();
    await AccountPage.TotalAccountCountAssertion();

});

/**
TC-ACC-02:Edit account name inline by double-clicking the name cell
1.Log in as admin and navigate to /bank/accounts (wait for table to load)
2.Click edit on recently created account.
3.Edit account name.
4.Save the account after edit.
5.Assert the toast message after save.
 */
//#region Testcase:2
test('TC-ACC-02:Edit account name inline by double-clicking the name cell @sanity @regression', async ({ Landingpage, AccountPage }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await AccountPage.createAcccount();
    await AccountPage.editButtonAccount();
    await AccountPage.editValuesAndSave();
});

/**
TC-ACC-03:Delete an account with confirmation and verify it is removed
1.Log in as admin and navigate to /bank/accounts (wait for table to load)
2.Click Delete on recently created account.
3.Confirm the delete by clicking yes button.
4.Assert the toast message after save.
 */
//#region Testcase:3
test('TC-ACC-03:Delete an account with confirmation and verify it is removed @sanity @regression', async ({ Landingpage, AccountPage }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await AccountPage.createAcccount();
    await AccountPage.deleteAccount()
    await AccountPage.confirmDeleteAndAssert()

});

/**
TC-ACC-04:Filter accounts by account type
1.Log in as admin and navigate to /bank/accounts
2.Note the total number of rows in data-testid='accounts-tbody'
3.Open the Account Type filter: data-testid='filter-type-select'
4.Select 'Savings' from the dropdown
5.Assert all visible rows have a Type badge showing 'Savings'
6.Assert no row shows 'Checking' or 'Credit' in the type badge
7.Click Reset Filters: data-testid='reset-filters-button'
8.Assert the row count returns to the original total
 */
//#region Testcase:4 
test('TC-ACC-04:Filter accounts by account type @regression', async ({ Landingpage, AccountPage }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await AccountPage.createAcccount();
    await AccountPage.accountRowCount()
    await AccountPage.filterAccount();
    await AccountPage.rowBadgeAssertions();
    await AccountPage.filterReset();
    await AccountPage.rowCountAssertionAfterReset();

});

/**
TC-ACC-05:Sort accounts by Balance column header (ascending → descending → none)
1.Log in as admin and navigate to /bank/accounts
2.Click the Balance column header: data-testid='sort-balance-header'
3.Assert data-sort-direction='asc' on the header
4.Assert the first row has the lowest balance value in the table
5.Click the Balance header again
6.Assert data-sort-direction='desc' and the first row now has the highest balance
7.Click the Balance header a third time
8.Assert data-sort-direction='none' — rows return to default sort order
 */
//#region Testcase:5
test('TC-ACC-05:Sort accounts by Balance column header (ascending → descending → none) @regression', async ({ Landingpage, AccountPage }) => {
    //await Landingpage.successfulLogin(adminusername, adminpassword);
    await AccountPage.createAcccount();
    await AccountPage.balanceAscending();
    await AccountPage.balanceDescending();
    await AccountPage.balanceNone();

});