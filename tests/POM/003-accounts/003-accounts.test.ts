// import { expect, test } from '@playwright/test'
import { test, expect } from '../../../fixtures/flows.fixture'
import { adminpassword, adminusername } from '../../../roles/roles'

/**
TC-ACC-01:Create a new account using the 3-step Open Account wizard
1.Log in as admin and navigate to /bank/accounts
2.Click 'Add Account': - Dashboard Page.
3.Fill all required field.
4.Assert all filed fields.
5.Click the Save Account Button and assert the toast message.
7.Verify that total accounts count on account page.
*/
test('TC-ACC-01:Create a new account using the 3-step Open Account wizard', async ({ Landingpage, DashboardPage, AccountPage }) => {
    await Landingpage.successfulLogin(adminusername, adminpassword);
    await DashboardPage.addAccountAndVerifyNavigation();
    await AccountPage.fillAllFields('001-Test Account', '1000');
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
test('TC-ACC-02:Edit account name inline by double-clicking the name cell', async ({ Landingpage, AccountPage }) => {
    await Landingpage.successfulLogin(adminusername, adminpassword);
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
test('TC-ACC-03:Delete an account with confirmation and verify it is removed', async ({ Landingpage, AccountPage }) => {
    await Landingpage.successfulLogin(adminusername, adminpassword);
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
test('TC-ACC-04:Filter accounts by account type', async ({ Landingpage, AccountPage }) => {
    await Landingpage.successfulLogin(adminusername, adminpassword);
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
test('TC-ACC-05:Sort accounts by Balance column header (ascending → descending → none)', async ({ Landingpage, AccountPage }) => {
    await Landingpage.successfulLogin(adminusername, adminpassword);
    await AccountPage.createAcccount();
    await AccountPage.balanceAscending();
    await AccountPage.balanceDescending();
    await AccountPage.balanceNone();

});