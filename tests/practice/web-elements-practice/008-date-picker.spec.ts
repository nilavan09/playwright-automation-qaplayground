import {expect, test} from '@playwright/test'


test.beforeEach(async({page})=>{
 await page.goto('https://www.qaplayground.com/practice/date-picker')

})
/**
TC01: Fill today's date in the date input and verify the value
1.Navigate to /practice/date-picker
2.Locate the today's date input using id='input-today-date' or data-testid='input-today-date'
3.In Selenium: element.sendKeys('2024-03-28') — format must be YYYY-MM-DD for type=date
4.In Playwright: page.fill('#input-today-date', '2024-03-28')
5.Assert getAttribute('value') returns '2024-03-28'
*/

test('TC01: Fill today date in the date input and verify the value', async ({ page }) => {

    // Locate the date input field
    const datelocator = page.getByTestId('input-today-date');

    // Generate today's date in YYYY-MM-DD format (ISO format required for date inputs)
    const todaydate = new Date().toISOString().split('T')[0];

    // Fill the date input with today's date
    await datelocator.fill(todaydate);

    // Verify the input value matches the expected date
    await expect(datelocator).toHaveValue(todaydate);

})
/**
TC02: Enter a birthday date and assert the value is stored
1.Navigate to /practice/date-picker
2.Locate the birthday input using id='input-birthday' or data-testid='input-birthday'
3.In Selenium: element.sendKeys('1995-06-15')
4.In Playwright: page.fill('#input-birthday', '1995-06-15')
5.Assert the input value attribute equals '1995-06-15'
 */
test('TC02: Enter a birthday date and assert the value is stored', async ({ page }) => {

    // Locate the birthday date input field
    const datelocator = page.getByTestId('input-birthday');

    // Fill the input with a sample birth date
    await datelocator.fill('2000-01-09');

    // Verify the entered value is correctly stored in the input field
    await expect(datelocator).toHaveValue('2000-01-09');

})

/**
TC03: Fill a date range — start date and end date
1.Navigate to /practice/date-picker
2.Locate start date input using data-testid='input-date-start'
3.Fill with '2024-01-01' using sendKeys (Selenium) or fill() (Playwright)
4.Locate end date input using data-testid='input-date-end'
5.Fill with '2024-01-31' and assert both inputs hold the correct values
 */
test('TC03: Fill a date range — start date and end date', async ({ page }) => {

    // Locate start date input field
    const startdatelocator = page.getByTestId('input-date-start');

    // Locate end date input field
    const enddatelocator = page.getByTestId('input-date-end');

    // Fill start date value
    await startdatelocator.fill('2000-01-09');

    // Verify start date is correctly set
    await expect(startdatelocator).toHaveValue('2000-01-09');

    // Fill end date value
    await enddatelocator.fill('2100-01-09');

    // Verify end date is correctly set
    await expect(enddatelocator).toHaveValue('2100-01-09');

})

/**
TC04: Verify date input rejects out-of-range date (min/max constraint)
1.Navigate to /practice/date-picker
2.Locate the restricted date input using data-testid='input-date-restricted'
3.Attempt to set a date before the min date using sendKeys or fill()
4.In Playwright: await expect(page.locator('#input-date-restricted')).toHaveAttribute('min')
5.Assert the input enforces the min/max boundary — value should clamp or stay invalid
 */
test('TC04: Verify date input rejects out-of-range date (min/max constraint)', async ({ page }) => {

    // Locate the restricted date input field
    const datelocator = page.getByTestId('input-date-restricted');

    // Verify minimum allowed date attribute
    await expect(datelocator).toHaveAttribute('min', "2024-01-01");

    // Verify maximum allowed date attribute
    await expect(datelocator).toHaveAttribute('max', "2024-12-31");

    // Try to fill an out-of-range date (before min limit)
    await datelocator.fill('2023-01-01');

    // Check HTML5 validity constraint on the input field
    const isValid = await datelocator.evaluate(
        (el: HTMLInputElement) => el.checkValidity()
    );

    // Expect the value to be invalid due to constraint violation
    expect(isValid).toBe(false);

})

/**
TC05: Clear a date input and verify it becomes empty
1.Navigate to /practice/date-picker
2.Locate the today's date input using data-testid='input-today-date'
3.Fill it with any valid date first
4.In Selenium: element.clear() — in Playwright: page.fill('#input-today-date', '')
5.Assert getAttribute('value') returns an empty string
 */
test('TC05: Clear a date input and verify it becomes empty', async ({ page }) => {

    // Locate the date input field
    const datelocator = page.getByTestId('input-today-date');

    // Generate today's date in YYYY-MM-DD format
    const todaydate = new Date().toISOString().split('T')[0];

    // Fill the input with today's date
    await datelocator.fill(todaydate);

    // Clear the date input field
    await datelocator.clear();

    // Verify the input is now empty
    await expect(datelocator).toHaveValue('');

})


