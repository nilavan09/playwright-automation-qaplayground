import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice/links')

})

/**
TC01: Verify link navigates to the correct URL on click
1.Navigate to /practice/links
2.Locate a link element using its text or data-testid
3.Click the link
4.Assert the current URL matches the expected destination
 */

test('TC01: Verify link navigates to the correct URL on click', async ({ page }) => {

    // Locate the internal home link
    const link = page.getByTestId('link-internal-home');

    // Click the link to trigger navigation
    await link.click();

    // Verify the page navigates to the expected URL
    await expect(page).toHaveURL('https://qaplayground.com/');

})

/**
TC02: Verify link text matches expected label
1.Navigate to /practice/links
2.Locate the link element
3.Read link text using getText() or textContent()
4.Assert the text equals the expected value
 */

test('TC02: Verify link text matches expected label', async ({ page }) => {

    // Locate the internal home link
    const link = page.getByTestId('link-internal-home');

    // Get the visible text content of the link
    const linkvalue = await link.textContent();

    // Log the link text for debugging
    console.log(linkvalue);

    // Verify the link text matches expected label
    expect(linkvalue).toBe('Home');

})

/**
TC03: Verify external link opens in a new tab
1.Navigate to /practice/links
2.Locate an external link (target='_blank')
3.Assert the link has target='_blank' and rel='noopener noreferrer'
4.Click the link and switch to the new window handle
5.Assert the new tab URL matches the expected external URL
 */
test('TC03: Verify external link opens in a new tab', async ({ page, context }) => {

    // Locate the external image link
    const link = page.getByTestId('link-image-ironman');

    // Verify link opens in a new tab
    await expect(link).toHaveAttribute('target', '_blank');

    // Verify security attributes for external link
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');

    // Wait for a new tab to open after clicking the link
    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        link.click()
    ]);

    // Wait for the new page to fully load
    await newpage.waitForLoadState('networkidle');

    // Verify the new page title
    await expect(newpage).toHaveTitle('You searched for iron man - ASHISH EDITZ');

})
/**
TC04: Verify internal link stays in the same tab
1.Navigate to /practice/links
2.Locate an internal link (no target='_blank')
3.Record the current window handle count
4.Click the link
5.Assert no new window or tab was opened
6.Assert the browser URL changed to the expected internal path
 */

test('TC04: Verify internal link stays in the same tab', async ({ page, context }) => {

    // Locate the internal "About" link
    const link = page.getByTestId('link-internal-about');

    // Count open pages before clicking the link
    const pagesbefore = context.pages().length;

    // Click the internal link
    await link.click();

    // Count open pages after clicking the link
    const pagesafter = context.pages().length;

    // Verify no new tab is opened
    expect(pagesbefore).toBe(pagesafter);

    // Verify navigation happened in the same tab
    await expect(page).toHaveURL('https://qaplayground.com/about-us');

})

/**
TC05: Verify broken link returns HTTP error status
1.Navigate to /practice/links
2.Locate a link marked as broken or invalid
3.Send an HTTP GET request to the link's href
4.Assert the response status is 404 or another error code
 */
test('TC05: Verify broken link returns HTTP error status', async ({ page }) => {

    // Locate the broken link element
    const link = page.getByTestId('link-broken-same');

    // Extract the href attribute from the link
    const href = await link.getAttribute('href');

    // Send an HTTP request directly to the लिंक target (without navigating UI)
    const response = await page.request.get(href!);

    // Verify the server returns an internal error status
    expect(response.status()).toBe(500);

})

/**
TC06: Verify link is keyboard accessible
1.Navigate to /practice/links
2.Tab to the link element
3.Assert the link receives focus and a visible focus ring appears
4.Press Enter to activate the link
5.Assert navigation occurs as expected 
 */
test('TC06: Verify link is keyboard accessible', async ({ page }) => {

    // Locate the internal home link
    const link = page.getByTestId('link-internal-home');

    // Reload page to reset focus state
    await page.reload();

    // Use Tab navigation to reach the link
    for (let i = 0; i < 20; i++) {

        await page.keyboard.press('Tab');

        // Check if the link is currently focused
        const isfocused = await link.evaluate(
            element => document.activeElement === element
        );

        // Stop tabbing once focus is on the link
        if (isfocused) break;
    }

    // Verify the link is focused (keyboard accessible)
    await expect(link).toBeFocused();

    // Activate the link using keyboard (Enter key)
    await page.keyboard.press('Enter');

    // Verify navigation to home page
    await expect(page).toHaveURL('https://qaplayground.com/');

})
/**
TC07: Verify link href attribute contains the correct URL
1.Navigate to /practice/links
2.Locate the link element
3.Read the href attribute using getAttribute('href')
4.Assert the value matches the expected URL or path
 */
test('TC07: Verify link href attribute contains the correct URL', async ({ page }) => {

    // Locate the broken link element
    const link = page.getByTestId('link-broken-same');

    // Get the href attribute value from the link
    const href = await link.getAttribute('href');

    // Verify the href matches the expected URL
    expect(href).toBe('https://the-internet.herokuapp.com/status_codes/500');

})

/**
TC08: Verify link has accessible label for screen readers
1.Navigate to /practice/links
2.Locate each link element
3.Assert each link has descriptive text or an aria-label
4.Assert no link text is ambiguous (e.g. 'click here', 'read more' alone) 
 */
test('TC08: Verify link has accessible label for screen readers', async ({ page }) => {

    // Locate all links inside the container
    const link = page.locator('.p-6').getByRole('link');
    const count = await link.count();

    // List of non-descriptive link texts (bad accessibility practice)
    const ambiguouswords = [
        'click here',
        'read more',
        'know more'
    ];

    // Iterate through all links and validate their accessible text
    for (let i = 0; i < count; i++) {

        // Get normalized link text
        const text = (await link.nth(i).textContent())
            ?.trim()
            .toLowerCase() || '';

        // Log text for debugging
        console.log(text);

        // Ensure link text is not vague/ambiguous for screen readers
        expect(ambiguouswords).not.toContain(text);
    }

})

/**
TC09: Verify link hover state is visually distinct
1.Navigate to /practice/links
2.Hover over a link
3.Assert an underline or color change appears on hover
 */
test('TC09: Verify link hover state is visually distinct', async ({ page }) => {

    // Locate the link to be tested
    const link = page.getByTestId('link-broken-same');

    // Hover over the link to trigger hover styles
    await link.hover();

    // Verify the link color changes on hover (visual feedback)
    await expect(link).toHaveCSS('color', 'rgb(153, 27, 27)');

})

/**
TC10: Verify right-click on link shows browser context menu
1.Navigate to /practice/links
2.Right-click a standard anchor link
3.Assert the browser context menu appears with 'Open in new tab' option
 */

test('TC10: Verify link opens in new tab (context menu behavior simulated)', async ({ page, context }) => {

    // Locate the internal home link
    const link = page.getByTestId('link-internal-home');

    // Get the href attribute of the link
    const href = await link.getAttribute('href');

    // Simulate opening link in a new tab using keyboard modifier (Ctrl + click)
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        link.click({ modifiers: ['Control'] })
    ]);

    // Bring the new tab to the foreground
    await newPage.bringToFront();

    // Wait for the new page to fully load
    await newPage.waitForLoadState('networkidle');

    // Small wait for stability (UI rendering sync)
    await page.waitForTimeout(300);

    // Verify the new tab URL contains the expected href value
    expect(newPage.url()).toContain(href!);

})
/**
TC11: Verify link page loads without console errors
1.Navigate to /practice/links
2.Assert the page loads with HTTP 200
3.Assert no JS console errors are present
4.Assert all link elements are visible and clickable
 */

test('TC11: Verify link page loads without console errors', async ({ page }) => {

    // Navigate to the links practice page
    const response = await page.goto('https://www.qaplayground.com/practice/links');

    // Verify page loaded successfully
    expect(response?.status()).toBe(200);

    // Array to capture runtime JavaScript errors
    const errorslist: string[] = [];

    // Listen for page-level errors
    page.on('pageerror', pe => {
        errorslist.push(pe.message);
    });

    // Ensure no runtime errors occurred during initial load
    expect(errorslist.length).toBe(0);

    // List of all expected link test IDs on the page
    const links = [
        'link-internal-home',
        'link-internal-about',
        'link-external-selenium',
        'link-external-course',
        'link-broken-newtab',
        'link-broken-same',
        'link-broken-empty',
        'link-image-broken',
        'link-image-ironman',
        'link-btn-broken',
        'link-btn-broken-2',
        'link-btn-home',
        'link-text-garbled-1',
        'link-text-garbled-2',
        'link-text-long',
        'link-text-anchor'
    ];

    // Verify all links are visible on the page
    for (let link of links) {
        await expect(page.getByTestId(link)).toBeVisible();
    }

})