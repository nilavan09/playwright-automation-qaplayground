import { errors, expect, test } from '@playwright/test'
import { text } from 'node:stream/consumers'



test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.com/practice/buttons')

})

/**
TC01: Verify button is clickable and triggers action
1.Navigate to /practice/buttons
2.Locate the primary button using data-testid or id
3.Click the button using click() or locator.click()
4.Assert the expected action or message appears after click
 */

test('TC01: Verify button is clickable and triggers action', async ({ page }) => {

    // Locate the Home button using its test id.
    const button = page.locator('button[data-testid=btn-goto-home]');

    // Click the button and wait for navigation to complete.
    await Promise.all([
        page.waitForURL('https://qaplayground.com/'),
        button.click()
    ]);

    // Verify that the user is redirected to the expected URL.
    await expect(page).toHaveURL('https://qaplayground.com/');

    // Verify that the QA PlayGround logo is visible on the page.
    await expect(page.getByAltText('QA PlayGround')).toBeVisible();

})

/**
TC02: Verify button displays the correct label text
1.Navigate to /practice/buttons
2.Locate the button element
3.Read the button text using getText() or textContent()
4.Assert the text matches the expected label
 */

test('TC02: Verify button displays the correct label text', async ({ page }) => {

    // Locate the button using its test id.
    const button = page.locator('button[data-testid=btn-goto-home]');

    // Locate the button by its accessible role and name.
    const label = page.getByRole('button', { name: 'Go To Home' });

    // Retrieve and verify the button label text.
    expect(await label.textContent()).toEqual('Go To Home'); // Generic assertion

    // Verify that the button displays the expected text.
    await expect(button).toHaveText('Go To Home'); // Locator assertion

})

/**
TC03: Verify button triggers the correct action on click
1.Navigate to /practice/buttons
2.Identify the expected result of clicking the button
3.Click the button
4.Assert the resulting state or message matches expectation
 */

test('TC03: Verify button triggers the correct action on click', async ({ page }) => {

    // Locate the Home button using its test id.
    const button = page.locator('button[data-testid=btn-goto-home]');

    // Click the button to trigger the navigation action.
    await button.click();

    // Verify that the browser navigates to the expected URL.
    await expect(page).toHaveURL('https://qaplayground.com/');

    // Verify that the QA PlayGround logo is visible, confirming successful page load.
    await expect(page.getByAltText('QA PlayGround')).toBeVisible();

})

/**
 TC04: Verify double-click button triggers double-click action
1.Navigate to /practice/buttons
2.Locate the double-click button using data-testid
3.Perform a double-click using doubleClick() or dblclick()
4.Assert the double-click message or state change appears
 */
test('TC04: Verify double-click button triggers double-click action', async ({ page }) => {

    // Locate the double-click button using its accessible name.
    const button = page.getByRole('button', { name: 'Double Click Me' });

    // Perform a double-click action on the button.
    await button.dblclick();

    // Wait briefly to observe the action result (optional).
    await page.waitForTimeout(500);

    // Verify that the button text remains unchanged after the double-click.
    await expect(button).toHaveText('Double Click Me');

})

/**
TC05: Verify right-click button triggers context menu action
1.Navigate to /practice/buttons
2.Locate the right-click button using data-testid
3.Perform a right-click using contextClick() or click({button:'right'})
4.Assert the right-click feedback message appears
 */
test('TC05: Verify right-click button triggers context menu action', async ({ page }) => {

    // Locate the right-click button using its accessible name.
    const button = page.getByRole('button', { name: 'Right Click Me' });

    // Perform a right-click action on the button.
    await button.click({ button: 'right' });

    // Locate the message displayed after the right-click action.
    const message = page.locator('p[data-testid="btn-action-result"]');

    // Verify that the expected feedback message is shown.
    await expect(message).toContainText('You Right-clicked on button!');

})

/**
TC06: Verify disabled button cannot be clicked
1.Navigate to /practice/buttons
2.Locate the disabled button
3.Assert isEnabled() returns false (Selenium) or toBeDisabled() passes (Playwright)
4.Attempt to click the button
5.Assert no action is triggered
 */
test('TC06: Verify disabled button cannot be clicked', async ({ page }) => {

    // Locate the disabled button using its test id.
    const button = page.locator("button[data-testid='btn-disabled']");

    // Verify that the button is disabled and cannot be interacted with.
    await expect(button).toBeDisabled();

    // Verify that the disabled attribute is present on the button.
    await expect(button).toHaveAttribute('disabled', '');

})
/**
TC07: Verify button is enabled when it should be
1.Navigate to /practice/buttons
2.Locate an active button
3.Assert isEnabled() returns true
4.Assert the button does not have the disabled attribute
 */
test('TC07: Verify button is enabled when it should be', async ({ page }) => {

    // Locate the active button using its id.
    const button = page.locator("button[id='btn-goto-home']");

    // Verify that the button is enabled.
    await expect(button).toBeEnabled();

    // Verify that the button does not have the disabled attribute.
    await expect(button).not.toHaveAttribute('disabled', '');

})
/**
TC08: Verify button is responsive on different screen sizes
1.Navigate to /practice/buttons
2.Resize the browser to mobile viewport (375px)
3.Assert the button is fully visible and not cut off
4.Assert the button is still clickable at mobile size
 */
test('TC08: Verify button is responsive on different screen sizes', async ({ page }) => {

    // Resize the browser to a mobile viewport.
    await page.setViewportSize({ width: 375, height: 667 });

    // Locate the button using its test id.
    const button = page.locator('button[data-testid=btn-goto-home]');

    // Verify that the button is visible.
    await expect(button).toBeVisible();

    // Verify that the button is within the visible viewport.
    await expect(button).toBeInViewport();

    // Click the button.
    await button.click();

    // Verify that clicking the button navigates to the home page.
    await expect(page).toHaveURL('https://qaplayground.com/');

})

/**
TC09: Verify button is accessible via keyboard
1.Navigate to /practice/buttons
2.Tab to the button element
3.Press Enter or Space to activate the button
4.Assert the button action fires correctly
 */
test('TC09: Verify button is accessible via keyboard', async ({ page }) => {

    // Locate the button using its test id.
    const button = page.locator('button[data-testid=btn-goto-home]');

    // Move keyboard focus to the button.
    await button.focus();

    // Press Enter and wait for the resulting navigation to complete.
    await Promise.all([
        page.waitForURL('https://qaplayground.com/'),
        page.keyboard.press('Enter')
    ]);

    // Verify that the destination page is displayed successfully.
    await expect(page.getByAltText('QA PlayGround')).toBeVisible();

})

/**
TC10: Verify button is accessible to screen readers
1.Navigate to /practice/buttons
2.Assert each button has a text label or aria-label
3.Assert role='button' is present or the element is a native button
 */

test('TC10: Verify button is accessible to screen readers', async ({ page }) => {

    // Locate all native buttons and elements with role="button".
    const buttons = page.locator('.p-6').locator('button, [role="button"]');

    // Define the expected accessible labels for each button.
    const buttonvalues = [
        'Go To Home',
        'Find Location',
        'Find my color?',
        'Do you know my size?',
        'Disabled',
        'Click and Hold!',
        'Double Click Me',
        'Right Click Me'
    ];

    // Verify that each button displays the expected label text.
    for (let i = 0; i < buttonvalues.length; i++) {
        await expect(buttons.nth(i)).toHaveText(buttonvalues[i]);
    }

    // Alternative approach using entries().
    for (const [index, value] of buttonvalues.entries()) {
        await expect(buttons.nth(index)).toHaveText(value);
    }

})

/**
TC11: Verify button hover state is visually distinct
1.Navigate to /practice/buttons
2.Hover over the button using Actions.moveToElement() or locator.hover()
3.Assert the button CSS changes (e.g. background color or shadow)
 */

test('TC11: Verify button hover state is visually distinct', async ({ page }) => {

    // Locate the "Go to Home" button using its test ID
    const button = page.locator('[data-testid=btn-goto-home]')

    // Simulate mouse hover action on the button
    await button.hover()

    // Get the computed background color of the button after hover
    const rgb = await button.evaluate(color =>
        getComputedStyle(color).backgroundColor
    )

    // Verify the hover background color matches the expected red RGB value
    expect(rgb).toMatch(/239,\s*68,\s*68/)

})

/**
TC12: Verify button state resets after page refresh
1.Navigate to /practice/buttons
2.Click a button that changes state
3.Refresh the page
4.Assert the button returns to its default state
 */

test('TC12: Verify button state resets after page refresh', async ({ page }) => {

    // Locate the "Click and Hold" button using its test ID
    const button = page.locator('[data-testid=btn-click-hold]')

    // Perform a long click (hold for 1600ms) on the button
    await button.click({ delay: 1600 })

    // Verify the button text changes after successful hold action
    await expect(button).toHaveText('Hold Complete!')

    // Refresh the page and wait until network activity is finished
    await page.reload({ waitUntil: 'networkidle' })

    // Verify the button resets back to its initial state after refresh
    await expect(button).toHaveText('Click and Hold!')

})
/**
TC13: Verify button does not overlap other page elements
1.Navigate to /practice/buttons
2.Assert each button bounding box does not intersect with adjacent elements
 */


test('TC13: Verify button does not overlap other page elements', async ({ page }) => {

    await page.goto('https://www.qaplayground.com/practice/buttons');

    const buttons = page.locator('.p-6').getByRole('button');
    const count = await buttons.count();

    console.log(`Total buttons: ${count}`);

    const boxes = [];

    // STEP 1: Collect bounding boxes
    for (let i = 0; i < count; i++) {

        const btn = buttons.nth(i)

        await expect(btn).toBeVisible()

        const box = await btn.boundingBox()

        if (!box) continue;

        boxes.push(box);
    }

    // STEP 2: Compare ADJACENT boxes only
    for (let i = 0; i < boxes.length - 1; i++) {

        const box1 = boxes[i];
        const box2 = boxes[i + 1]

        // const isSeperated = (
        //     box1.x + box1.width < box2.x ||
        //     box2.x + box2.width < box1.x ||
        //     box1.y + box1.height < box2.y ||
        //     box2.y + box2.height < box1.y
        // );

        // visually in site buttons are in vertical so comaring y is enough. 
        const isSeperated = ( box1.y + box1.height < box2.y ||box2.y + box2.height < box1.y); 
        console.log(isSeperated)
        expect(isSeperated).toBeTruthy();
    }
});                                     

/**
TC14: Verify button styling matches design specification
1.Navigate to /practice/buttons
2.Assert the button background color matches the expected value
3.Assert the button font size and weight are correct
4.Assert border-radius and padding match the design 
 */
test('TC14: Verify button styling matches design specification', async ({ page }) => {

    // Locate the "Go To Home" button using its accessible role and name
    const button = page.getByRole('button', { name: 'Go To Home' });

    // Verify the button background color matches the expected design
    await expect(button).toHaveCSS('background-color', 'rgb(239, 68, 68)');

    // Alternative way to fetch computed styles manually using evaluate()
    // const fontsize = await button.evaluate(size => getComputedStyle(size).fontSize)
    // const radius = await button.evaluate(radius => getComputedStyle(radius).borderRadius)

    // Verify the font size matches the design specification
    await expect(button).toHaveCSS('font-size', '14px');

    // Verify the font weight matches the expected style
    await expect(button).toHaveCSS('font-weight', '500');

    // Verify the button border radius for rounded corners
    await expect(button).toHaveCSS('border-radius', '6px');

    // Verify bottom padding spacing
    await expect(button).toHaveCSS('padding-bottom', '8px');

    // Verify left padding spacing
    await expect(button).toHaveCSS('padding-left', '16px');

})

/**
TC15: Verify button page loads without errors
1.Navigate to /practice/buttons
2.Assert the page loads successfully (HTTP 200)
3.Assert no JS console errors are present
4.Assert all buttons are visible in the DOM
 */

test('TC15: Verify button page loads without errors', async ({ page }) => {

    // Navigate to the buttons practice page
    const response = await page.goto('https://www.qaplayground.com/practice/buttons');

    // Verify the page loads successfully with HTTP status 200
    expect(response?.status()).toBe(200);

    // Array to capture JavaScript runtime errors from the page
    const errors: string[] = [];

    // Listen for page-level JavaScript errors
    page.on('pageerror', err => {
        errors.push(err.message);
    });

    // Reload the page after attaching the error listener
    await page.goto('https://www.qaplayground.com/practice/buttons');

    // Verify no JavaScript errors occurred during page load
    expect(errors.length).toBe(0);

    // Optional: Print captured errors for debugging
    // console.log(errors);

    // Locate all buttons inside the container
    const buttons = await page.locator('.p-6').getByRole('button');

    // Get total number of buttons
    const count = await buttons.count();

    // Verify every button is visible on the page
    for (let i = 0; i < count; i++) {
        await expect(buttons.nth(i)).toBeVisible();
    }

});
/**
 Reference : Capture console+runtime error
 */

test('JS errors (runtime)', async ({ page }) => {

    // Array to store JavaScript runtime errors
    const errors: string[] = [];

    // Listen for uncaught JavaScript errors on the page
    page.on('pageerror', err => {

        // Store error message with "runtime" label
        errors.push(`runtime: ${err.message}`);
    });

    // Navigate to the page intentionally containing a JavaScript error
    await page.goto('https://the-internet.herokuapp.com/javascript_error');

    // Verify exactly one runtime JavaScript error occurred
    expect(errors.length).toBe(1);

});

test('JS errors (console)', async ({ page }) => {

    // Array to store browser console messages
    const errors: string[] = [];

    // Listen for all console events from the page
    page.on('console', con => {

        // Store console message text
        errors.push(con.text());
    });

    // Navigate to the practice buttons page
    await page.goto('https://www.qaplayground.com/practice/buttons');

    // Trigger a console error manually inside the browser
    await page.evaluate(() => {
        console.error("testing");
    });

    // Small wait to ensure console event is captured
    await page.waitForTimeout(500);

    // Verify the expected console error message exists
    expect(errors).toContain('testing');

});

