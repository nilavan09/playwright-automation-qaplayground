//import { expect, test } from '@playwright/test'
import { test } from '../../../fixtures/flows.fixture'
import { roles } from '../../../roles/roles'

test.afterEach('Closing Browser',async ({ page }) => {
    await page.close();});

/**
TC-LOGIN-01:Successful login with admin credentials
1.Navigate to /bank
2.Locate the username field: id='username' or data-testid='username-input'
3.Type 'admin' into the username field
4.Locate the password field: id='password' or data-testid='password-input'
5.Type 'admin123' into the password field
6.Click the Login button: id='login-btn' or data-testid='login-button'
7.Assert the browser redirects to /bank/dashboard
8.Assert the element data-testid='page-title' has text 'Dashboard'
 */
test('TC-LOGIN-01:Successful login with admin credentials', async ({ Landingpage }) => {


    await Landingpage.successfulLogin(roles.admin.username, roles.admin.password);

});
/**
TC-LOGIN-02:Failed login shows error alert for invalid credentials
1.Navigate to /bank
2.Enter 'wrong' in the username field and 'wrong123' in the password field
3.Click the Login button: data-testid='login-button'
4.Assert the error alert is visible: data-testid='login-alert'
5.Assert the alert text contains 'Invalid username or password'
6.Assert the current URL is still /bank (no redirect)
 */
test('TC-LOGIN-02:Failed login shows error alert for invalid credentials', async ({ Landingpage }) => {


    await Landingpage.failedLogin(roles.admin.username, roles.admin.password + "wrong");

});
/**
 TC-LOGIN-03:Toggle password visibility hides and reveals password text
1.Navigate to /bank
2.Enter any text in the password field: data-testid='password-input'
3.Assert the input type attribute is 'password' (text is hidden)
4.Click the toggle button: data-testid='toggle-password-btn' or aria-label='Toggle password visibility'
5.Assert the input type attribute is now 'text' (text is visible)
6.Click the toggle button again
7.Assert the input type attribute reverts to 'password'
 */

test('TC-LOGIN-03:Toggle password visibility hides and reveals password text', async ({ Landingpage }) => {


    await Landingpage.togglePasswordVisibility(roles.admin.password);

});

/**
TC-LOGIN-04:Pressing Enter in the password field submits the login form
1.Navigate to /bank
2.Enter 'admin' in the username field
3.Click into the password field and type 'admin123'
4.Press the Enter key while the password field is focused
5.Assert the browser redirects to /bank/dashboard without clicking the Login button
 */
test('TC-LOGIN-04:Pressing Enter in the password field submits the login form', async ({ Landingpage }) => {


    await Landingpage.withEnterButton(roles.admin.username, roles.admin.password);


});
/**
TC-LOGIN-05:Read-only viewer login grants restricted access
1.Navigate to /bank
2.Enter 'viewer' in the username field and 'viewer123' in the password field
3.Click the Login button: data-testid='login-button'
4.Assert redirect to /bank/dashboard
5.Assert the viewer badge is visible: data-testid='viewer-badge' with text 'Read-only'
6.Assert the role indicator: data-testid='role-indicator' contains 'Read-only Viewer'
7.Navigate to /bank/accounts and assert the Add New Account button is NOT present
 */
test('TC-LOGIN-05:Read-only viewer login grants restricted access', async ({ Landingpage }) => {

    await Landingpage.successfulLogin(roles.readonly.username, roles.readonly.password);
});
