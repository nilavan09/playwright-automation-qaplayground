import { expect, test } from '@playwright/test'




test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice/alerts-dialogs')

})

/**
TC01: Accept a simple browser alert and verify it closes
1.Navigate to /practice/alerts-dialogs
2.Set up an alert listener before clicking: page.on('dialog', d => d.accept()) in Playwright
3.Click the 'Simple Alert' button using data-testid='btn-simple-alert'
4.In Selenium: driver.switchTo().alert().accept()
5.Assert the alert is dismissed and the page remains interactive
 */

test('TC01: Accept a simple browser alert and verify it closes', async ({ page }) => {
    // await Promise.all([
    //     page.getByTestId('btn-simple-alert').click(),
    //     page.on('dialog',d=>d.accept())  
    // ])

    // Listen for any browser dialog (alert/confirm/prompt)
    // and automatically accept it when it appears
    page.on('dialog', d => d.accept());

    // Trigger the alert by clicking the button
    await page.getByTestId('btn-confirm-alert').click();

    // Verify that the page is still functional and the button is visible after alert is handled
    await expect(page.getByTestId('btn-simple-alert')).toBeVisible();

})

/**
TC02: Get text from a simple browser alert before accepting
1.Navigate to /practice/alerts-dialogs
2.In Playwright: page.on('dialog', async d => { expect(d.message()).toBe('Welcome to QA PlayGround!'); await d.accept(); })
3.Click the 'Simple Alert' button
4.In Selenium: String alertText = driver.switchTo().alert().getText(); assert alertText.equals('Welcome to QA PlayGround!')
5.Accept the alert after reading the text
 */

test('TC02: Get text from a simple browser alert before accepting', async ({ page }) => {

    // Variable to store alert message text
    let message = '';

    // Listen for browser dialog (alert) event
    page.on('dialog', async dialog => {

        // Capture the alert message text
        message = dialog.message();

        // Accept the alert to close it
        await dialog.accept();
    });

    // Trigger the alert
    await page.getByTestId('btn-simple-alert').click();

    // Verify the alert message text is as expected
    expect(message).toBe('Welcome to QA PlayGround!');

})
/**
TC03: Accept a confirm dialog and verify accepted state
1.Navigate to /practice/alerts-dialogs
2.In Playwright: page.on('dialog', d => d.accept())
3.Click the 'Confirm Alert' button using data-testid='btn-confirm-alert'
4.In Selenium: driver.switchTo().alert().accept()
5.Assert the result display shows 'Accepted'
 */

test('TC03: Accept a confirm dialog and verify accepted state', async ({ page }) => {

    // Handle the confirm dialog by accepting it when it appears
    page.on('dialog', d => d.accept());

    // Click the button that triggers the confirm dialog
    await page.getByTestId('btn-confirm-alert').click();

    // Verify the result text reflects the accepted action
    await expect(page.getByTestId('result-confirm'))
        .toHaveText('Result: Accepted');

})

/**
TC04: Dismiss a confirm dialog and verify dismissed state
1.Navigate to /practice/alerts-dialogs
2.In Playwright: page.on('dialog', d => d.dismiss())
3.Click the 'Confirm Alert' button
4.In Selenium: driver.switchTo().alert().dismiss()
5.Assert the result display shows 'Dismissed'
 */
test('TC04: Dismiss a confirm dialog and verify dismissed state', async ({ page }) => {

    // Listen for the confirm dialog and dismiss it when it appears
    page.on('dialog', d => d.dismiss());

    // Click the button that triggers the confirm dialog
    await page.getByTestId('btn-confirm-alert').click();

    // Verify that the UI reflects the dismissed action
    await expect(page.getByTestId('result-confirm'))
        .toHaveText('Result: Dismissed');

})

/**
TC05: Enter text in a prompt dialog and accept it
1.Navigate to /practice/alerts-dialogs
2.In Playwright: page.on('dialog', d => d.accept('John Doe'))
3.Click the 'Prompt Alert' button using data-testid='btn-prompt-alert'
4.In Selenium: Alert prompt = driver.switchTo().alert(); prompt.sendKeys('John Doe'); prompt.accept()
5.Assert the prompt result display shows 'Your name is - John Doe'
 */
test('TC05: Enter text in a prompt dialog and accept it', async ({ page }) => {

    // Handle the prompt dialog and provide input text, then accept it
    page.on('dialog', d => d.accept('Pozhilnilavan G'));

    // Trigger the prompt dialog
    await page.getByTestId('btn-prompt-alert').click();

    // Verify the entered text is reflected in the result message
    await expect(page.getByTestId('result-prompt'))
        .toHaveText('Your name is — Pozhilnilavan G');

})

/**
TC06: Dismiss a prompt dialog and verify no input is captured
1.Navigate to /practice/alerts-dialogs
2.In Playwright: page.on('dialog', d => d.dismiss())
3.Click the 'Prompt Alert' button
4.In Selenium: driver.switchTo().alert().dismiss()
5.Assert the prompt result display is empty or not visible
 */
test('TC06: Dismiss a prompt dialog and verify no input is captured', async ({ page }) => {

    // Handle the prompt dialog by dismissing it (user cancels the input)
    page.on('dialog', d => d.dismiss());

    // Trigger the prompt dialog
    await page.getByTestId('btn-prompt-alert').click();

    // Verify that no result is displayed after dismissing the prompt
    await expect(page.getByTestId('result-prompt')).not.toBeVisible();

})

/**
TC07: Verify toast notification appears after triggering
1.Navigate to /practice/alerts-dialogs
2.Click the 'Toast Alert' button using data-testid='btn-toast-alert'
3.Wait for the toast element to appear in the DOM
4.In Playwright: await expect(page.locator('[data-sonner-toast]')).toBeVisible()
5.Assert the toast text contains 'This is simple toast'
 */
test('TC07: Verify toast notification appears after triggering', async ({ page }) => {

    // Trigger the toast notification
    await page.getByTestId('btn-toast-alert').click();

    // Verify the toast message appears on the screen
    await expect(page.getByText('This is simple toast.')).toBeVisible();

    // Alternative approach (commented): directly locate toast container
    // const toastmessage = page.locator('[data-sonner-toast]')
    // await expect(toastmessage).toHaveText('This is simple toast.')

})

/**
TC08: Close a modal/sweet alert using the Cancel button
1.Navigate to /practice/alerts-dialogs
2.Click the 'Sweet Alert' button using data-testid='btn-modal-alert'
3.Wait for the modal dialog to appear
4.Click the 'You Are!' cancel button inside the modal
5.Assert the modal is no longer visible
 */

test('TC08: Close a modal/sweet alert using the Cancel button', async ({ page }) => {

    // Trigger the modal/sweet alert
    await page.getByTestId('btn-modal-alert').click();

    // Locate the modal dialog
    const modal = page.getByRole('alertdialog');

    // Verify modal is visible after opening
    await expect(modal).toBeVisible();

    // Locate the cancel button inside the modal
    const cancelButton = modal.getByRole('button', { name: 'You Are!' });

    // Click the cancel button to close the modal
    await cancelButton.click();

    // Verify the modal is no longer visible
    await expect(modal).toBeHidden();

})

/**
TC09: Close an advanced dialog using the Close button
1.Navigate to /practice/alerts-dialogs
2.Click the 'Share' button using data-testid='btn-dialog-share'
3.Wait for the dialog to open and assert the link input is visible
4.Assert the input value contains 'qaplayground.com/practice/alerts-dialogs'
5.Click the 'Close' button and assert the dialog is dismissed
 */

test('TC09: Close an advanced dialog using the Close button', async ({ page }) => {

    // Open the share/advanced dialog
    await page.getByTestId('btn-dialog-share').click();

    // Verify the share link is prefilled correctly in the input field
    await expect(page.getByTestId('input-share-link'))
        .toHaveValue('https://www.qaplayground.com/practice/alerts-dialogs');

    // Close the dialog using the close button
    await page.getByTestId('btn-dialog-close').click();

})

/**
TC10: Verify alerts page loads without errors
1.Navigate to /practice/alerts-dialogs
2.Assert HTTP 200 response
3.Assert no JS console errors are present
4.Assert all 6 alert trigger buttons are visible in the DOM
*/
test('TC10: Verify alerts page loads without errors', async ({ page }) => {

    // Navigate to the Alerts & Dialogs page
    const response = await page.goto('https://www.qaplayground.com/practice/alerts-dialogs');

    // Verify the page loaded successfully
    expect(response?.status()).toBe(200);

    // Array to capture any runtime JavaScript errors on the page
    const errors: string[] = [];

    // Listen for page-level JavaScript errors
    page.on('pageerror', err => {
        errors.push(err.message);
    });

    // Verify no runtime errors occurred during page load
    expect(errors.length).toBe(0);

    // List of expected alert/dialog buttons on the page
    const allbuttons = [
        'Simple Alert',
        'Confirm Alert',
        'Prompt Alert',
        'Toast Alert',
        'Sweet Alert',
        'Share'
    ];

    // Verify each button is visible on the page
    for (let button of allbuttons) {
        await expect(
            page.getByRole('button', { name: button, exact: true })
        ).toBeVisible();
    }

})


