import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    
    await page.goto('https://www.qaplayground.com/practice/radio-checkbox')

})

/**
TC01: Verify radio button is selected on click
1.Navigate to /practice/radio-checkbox
2.Locate the first radio button using its data-testid or id
3.Click the radio button
4.Assert the radio button is now selected (isSelected() / isChecked())
 */

test('TC01: Verify radio button is selected on click', async ({ page }) => {

    // Locate the "Yes" radio button
    const radiobutton = page.getByTestId('radio-yes-1');

    // Click the radio button to select it
    await radiobutton.click();

    // Verify the radio button is selected (checked)
    await expect(radiobutton).toBeChecked();

})

/**
TC02: Verify selecting another radio deselects the previous one
1.Navigate to /practice/radio-checkbox
2.Click the first radio button and assert it is selected
3.Click the second radio button
4.Assert the first radio button is now deselected
5.Assert the second radio button is now selected
 */
test('TC02: Verify selecting another radio deselects the previous one', async ({ page }) => {

    // Locate the first radio button ("Yes")
    const radiobutton1 = page.getByTestId('radio-yes-1');

    // Click and verify it is selected
    await radiobutton1.click();
    await expect(radiobutton1).toBeChecked();

    // Locate the second radio button ("No")
    const radiobutton2 = page.getByTestId('radio-no-1');

    // Click the second radio button
    await radiobutton2.click();

    // Verify the first radio button is now deselected
    await expect(radiobutton1).not.toBeChecked();

    // Verify the second radio button is selected
    await expect(radiobutton2).toBeChecked();

})

/**
TC03: Verify only one radio button can be selected at a time
1.Navigate to /practice/radio-checkbox
2.Click each radio button in the group one by one
3.After each click assert only the clicked radio is selected
4.Assert all others are deselected
 */

test('TC03: Verify only one radio button can be selected at a time', async ({ page }) => {

    // Locate the "Yes" radio button
    const yes = page.getByTestId('radio-yes-2');

    // Locate the "No" radio button
    const no = page.getByTestId('radio-no-2');

    // Select "Yes" option
    await yes.click();

    // Verify "No" is not selected when "Yes" is selected
    await expect(no).not.toBeChecked();

    // Select "No" option
    await no.click();

    // Verify "Yes" is not selected when "No" is selected
    await expect(yes).not.toBeChecked();

})

/**
TC04: Verify radio button label text is correct
1.Navigate to /practice/radio-checkbox
2.Locate each radio button label
3.Assert the label text matches the expected value for each option
 */

test('TC04: Verify radio button label text is correct', async ({ page }) => {

    // Locate all label elements on the page
    const labels = page.locator('label');

    // Verify first radio button label text is "Yes"
    await expect(labels.nth(0)).toHaveText('Yes');

    // Verify second radio button label text is "No"
    await expect(labels.nth(1)).toHaveText('No');

})

/**
TC05: Verify radio button state persists after page interaction
1.Navigate to /practice/radio-checkbox
2.Select a radio button
3.Interact with other elements on the page
4.Assert the originally selected radio button is still selected
 */

test('TC05: Verify radio button state persists after page interaction', async ({ page }) => {

    // Locate the first "Yes" radio button
    const radiobutton1 = page.getByTestId('radio-yes-1');

    // Select the first radio button
    await radiobutton1.click();

    // Interact with another radio button on the page
    const radiobutton2 = page.getByTestId('radio-yes-2');
    await radiobutton2.click();

    // Verify the first radio button remains checked after interaction
    await expect(radiobutton1).toBeChecked();

})

/**
TC06: Verify checkbox can be checked
1.Navigate to /practice/radio-checkbox
2.Locate a checkbox using its data-testid or id
3.Click the checkbox to check it
4.Assert isSelected() or isChecked() returns true
 */
test('TC06: Verify checkbox can be checked', async ({ page }) => {

    // Locate the terms and conditions checkbox
    const checkbox = page.getByTestId('checkbox-terms');

    // Click the checkbox to select it
    await checkbox.click();

    // Verify the checkbox is checked
    await expect(checkbox).toBeChecked();

})

/**
TC07: Verify checkbox can be unchecked
1.Navigate to /practice/radio-checkbox
2.Locate a checked checkbox
3.Click the checkbox to uncheck it
4.Assert isSelected() or isChecked() returns false
 */
test('TC07: Verify checkbox can be unchecked', async ({ page }) => {

    // Locate the "Remember Me" checkbox
    const checkbox = page.getByTestId('checkbox-remember-me');

    // Click the checkbox (toggle action)
    await checkbox.click();

    // Verify the checkbox is unchecked
    await expect(checkbox).not.toBeChecked();

});

/**
TC08: Verify multiple checkboxes can be selected simultaneously
1.Navigate to /practice/radio-checkbox
2.Click the first checkbox and assert it is checked(by default its already checked in the site)
3.Click the second checkbox and assert it is checked
4.Assert both checkboxes remain checked at the same tim
 */
test('TC08: Verify multiple checkboxes can be selected simultaneously', async ({ page }) => {

    // Locate the "Remember Me" checkbox
    const checkbox1 = page.getByTestId('checkbox-remember-me');

    // Locate the "Terms and Conditions" checkbox
    const checkbox2 = page.getByTestId('checkbox-terms');

    // Select the terms checkbox
    await checkbox2.click();

    // Verify terms checkbox is checked
    await expect(checkbox2).toBeChecked();

    // Verify both checkboxes can be selected independently
    await expect(checkbox1).toBeChecked();

});

/**
TC09: Verify radio buttons are keyboard navigable
1.Navigate to /practice/radio-checkbox
2.Tab to the radio button group
3.Use arrow keys to navigate between options
4.Assert each focused radio button is selected on focus
 */

test('TC09: Verify radio buttons are keyboard navigable', async ({ page }) => {

    // Reload page to reset state before keyboard interactions
    await page.reload();

    // Move focus to the radio button group using Tab navigation
    for (let i = 0; i < 12; i++) {
        await page.keyboard.press('Tab');
    }

    // Locate radio buttons
    const noradio = page.getByTestId('radio-no-1');
    const yesradio = page.getByTestId('radio-yes-1');

    // Navigate within radio group using keyboard arrow key
    await page.keyboard.press('ArrowRight');

    // Verify one radio option gets selected via keyboard navigation
    await expect(noradio).toBeChecked();

    // Move selection again using arrow key
    await page.keyboard.press('ArrowRight');

    // Verify only one radio remains selected (radio group behavior)
    await expect(yesradio).toBeChecked();

});

/**
TC10: Verify checkbox is keyboard togglable
1.Navigate to /practice/radio-checkbox
2.Tab to a checkbox element
3.Press Space to check it
4.Assert the checkbox is now checked
5.Press Space again and assert it is unchecked
*/

test('TC10: Verify checkbox is keyboard togglable', async ({ page }) => {

    // Reload page to ensure clean initial state
    await page.reload();

    // Locate the terms checkbox
    const checkbox = page.getByTestId('checkbox-terms');

    // Press Tab repeatedly until checkbox receives focus
    for (let i = 0; i < 25; i++) {

        // Check if checkbox is currently focused
        const isFocused = await checkbox.evaluate(
            el => el === document.activeElement
        );

        // Stop tabbing once focus reaches checkbox
        if (isFocused) break;

        await page.keyboard.press('Tab');
    }

    // Toggle checkbox using keyboard (Space key)
    await page.keyboard.press('Space');

    // Verify checkbox is now checked
    await expect(checkbox).toBeChecked();

});
/**
TC11 & 12: Verify disabled radio button cannot be selected( TC 12 = disabled checknox not avail on site)
1.Navigate to /practice/radio-checkbox
2.Locate a disabled radio button
3.Attempt to click the disabled radio button
4.Assert the radio button remains unselected
5.Assert isEnabled() returns false
 */

test('TC11: Verify disabled radio button cannot be selected', async ({ page }) => {

    // Locate the disabled "Maybe" radio button
    const disablebutton = page.getByTestId('radio-maybe');

    // Verify the radio button is disabled
    await expect(disablebutton).toBeDisabled();

    // Verify it is not selected by default
    await expect(disablebutton).not.toBeChecked();

    // Verify it is not enabled using direct boolean check
    expect(await disablebutton.isEnabled()).toBeFalsy();

});

/**
TC13: Verify radio button group is accessible to screen readers
1.Navigate to /practice/radio-checkbox
2.Verify each radio button has an associated label (for/id linkage)
3.Verify the radio group has a fieldset and legend or aria-label
4.Assert aria-checked attribute reflects current selection state
 */

test('TC13: Verify radio button group is accessible to screen readers', async ({ page }) => {

    // Locate radio buttons
    const yes = page.getByTestId('radio-yes-1');
    const no = page.getByTestId('radio-no-1');

    // Verify each radio button has an associated visible label (via ancestor label)
    const yesLabel = yes.locator('xpath=ancestor::label');
    await expect(yesLabel).toBeVisible();

    const noLabel = no.locator('xpath=ancestor::label');
    await expect(noLabel).toBeVisible();

    // Select the "Yes" radio button
    await yes.check();

    // Verify correct radio selection behavior
    await expect(yes).toBeChecked();
    await expect(no).not.toBeChecked();

});

/**
TC14: Verify radio button visual state changes on selection
1.Navigate to /practice/radio-checkbox
2.Observe unselected radio button appearance
3.Click the radio button
4.Assert the visual indicator (filled circle) appears
 */

test.skip('TC14: Verify radio button visual state changes on selection', async ({ page }) => {

    // Set consistent viewport size for visual regression testing
    await page.setViewportSize({ width: 1280, height: 720 });

    // Locate the radio button (bug scenario)
    const radiobutton = page.getByTestId('radio-bug-yes');

    // Locate the wrapper label for screenshot comparison
    const wrapper = page.locator('label:has(#radio-bug-yes)');

    // Verify radio button is not selected initially
    await expect(radiobutton).not.toBeChecked();

    // Capture baseline (before selection) screenshot
    await expect(wrapper).toHaveScreenshot('radio-before.png', {
        maxDiffPixelRatio: 0.02
    });

    // Click the radio button to select it
    await radiobutton.click();

    // Verify radio button is now selected
    await expect(radiobutton).toBeChecked();

    // Capture after-selection screenshot for visual comparison
    await expect(wrapper).toHaveScreenshot('radio-after.png', {
        maxDiffPixelRatio: 0.02
    });

});

/**
TC15: Verify radio and checkbox elements load without errors
1.Navigate to /practice/radio-checkbox
2.Assert the page loads with HTTP 200 status
3.Assert no console errors are present
4.Assert all radio buttons and checkboxes are visible on the page
 */

test('TC15: Verify radio and checkbox elements load without errors', async ({ page }) => {

    // Navigate to the radio & checkbox page
    const response = await page.goto('https://www.qaplayground.com/practice/radio-checkbox');

    // Verify successful page load (HTTP 200)
    expect(response?.status()).toBe(200);

    // Array to capture any runtime JavaScript errors on the page
    const errorslist: string[] = [];

    // Listen for page-level JS errors
    page.on('pageerror', pe => {
        errorslist.push(pe.message);
    });

    // Ensure no runtime errors were captured
    expect(errorslist.length).toBe(0);

    // List of all expected radio and checkbox test IDs
    const buttons = [
        'radio-yes-1',
        'radio-no-1',
        'radio-yes-2',
        'radio-no-2',
        'radio-bug-yes',
        'radio-bug-no',
        'radio-foo',
        'radio-bar',
        'radio-going',
        'radio-not-going',
        'checkbox-remember-me',
        'checkbox-terms'
    ];

    // Verify each element is visible on the page
    for (let button of buttons) {
        await expect(page.getByTestId(button)).toBeVisible();
    }

});