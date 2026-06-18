import { expect, test } from '@playwright/test'


test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice/data-table')

})
/**
TC01: Verify all table column headers are present
1.Navigate to /practice/data-table
2.Wait for the table to load (data fetched from external API)
3.In Selenium: driver.findElements(By.tagName('th')) — assert size equals 6
4.In Playwright: page.locator('table th').allInnerTexts()
5.Assert headers include: Sr No., Book Name, Book Genre, Book Author, Book ISBN, Book Published
*/

test('TC01: Verify all table column headers are present', async ({ page }) => {

    // Wait for table to load completely (not ideal, but used here for stability)
    await page.waitForTimeout(3000)

    // Locate the books table
    const table = page.getByTestId('books-table')

    // Get all text content inside the table (for debugging)
    const vaue = await table.allTextContents()

    // Verify each column header text individually
    await expect(page.getByTestId('col-sr')).toHaveText('Sr No.')
    await expect(page.getByTestId('col-title')).toHaveText('Book Name')
    await expect(page.getByTestId('col-genre')).toHaveText('Book Genre')
    await expect(page.getByTestId('col-author')).toHaveText('Book Author')
    await expect(page.getByTestId('col-isbn')).toHaveText('Book ISBN')
    await expect(page.getByTestId('col-published')).toHaveText('Book Published')

    // Log table content for debugging
    console.log(vaue)

    // Playwright recommended way: validate all column headers together
    const headers = table.getByRole('columnheader')

    // Verify total number of headers
    await expect(headers).toHaveCount(6)

    // Verify exact header texts in order
    await expect(headers).toHaveText([
        'Sr No.',
        'Book Name',
        'Book Genre',
        'Book Author',
        'Book ISBN',
        'Book Published'
    ])

})

/**
TC02: Count the total number of rows in the data table
1.Navigate to /practice/data-table
2.Wait for the table to finish loading (books data visible)
3.In Selenium: List<WebElement> rows = driver.findElements(By.cssSelector('tbody tr')) — assert rows.size() == 10
4.In Playwright: await expect(page.locator('tbody tr')).toHaveCount(10)
5.Assert exactly 10 data rows are present in the table body
 */
test('TC02: Count the total number of rows in the data table', async ({ page }) => {

    // Wait for the page to finish loading network resources
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // Locate the books table
    const table = page.getByTestId('books-table');

    // Get all rows inside the table (including header row)
    const headers = table.getByRole('row');

    // Count total number of rows
    const value = await headers.count();

    // Verify expected number of rows in the table
    expect(value).toEqual(11);

    // Log row count for debugging
    console.log(value);

})

/**
TC03: Read a cell value from a specific row and column
1.Navigate to /practice/data-table
2.Wait for table to load
3.In Selenium: driver.findElement(By.xpath('(//tbody/tr)[1]/td[2]')).getText()
4.In Playwright: page.locator('tbody tr').nth(0).locator('td').nth(1).textContent()
5.Assert the returned value is a non-empty string (book title)
 */

test('TC03: Read a cell value from a specific row and column', async ({ page }) => {

    // Wait until the page finishes loading network requests
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // Locate the books table
    const table = page.getByTestId('books-table');

    // Get the cell value from first row (index 0) and third column (index 2)
    const value = await table
        .locator('tbody tr')
        .nth(0)
        .locator('td')
        .nth(2)
        .textContent();

    // Ensure value exists (not null/undefined)
    expect(value).toBeTruthy();

    // Ensure trimmed value has content
    expect(value?.trim().length).toBeGreaterThan(0);

    // Ensure value is not an empty string
    expect(value?.trim().length).not.toBe('');

    // Ensure value is not null
    expect(value).not.toBeNull();

})

/**
TC04: Find a book row by author name using XPath or filter
1.Navigate to /practice/data-table
2.Wait for table to load
3.Note the author name displayed in the 4th column of the first row
4.In Selenium: driver.findElement(By.xpath("//td[text()='" + authorName + "']"))
5.In Playwright: page.locator('tbody tr').filter({ hasText: authorName })
6.Assert the matching row is found and visible
 */

test('TC04: Find a book row by author name using XPath or filter', async ({ page }) => {

    // Wait until all network requests are finished
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // Locate the books table
    const table = page.getByTestId('books-table');

    // Filter rows that contain the text "Book Author"
    const val = table.getByRole('row').filter({ hasText: 'Book Author' });

    // Verify that the filtered row is visible on the page
    await expect(val).toBeVisible();

})

/**
TC05: Verify the table is not empty after page load
1.Navigate to /practice/data-table
2.Wait for the loading state to resolve (spinner or skeleton to disappear)
3.In Selenium: assert driver.findElements(By.cssSelector('tbody tr')).size() > 0
4.In Playwright: await expect(page.locator('tbody tr').first()).toBeVisible()
5.Assert at least one data row is visible in the table
 */

test('TC05: Verify the table is not empty after page load', async ({ page }) => {

    // Wait until the page finishes loading all network requests
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // Locate the first row inside the table body
    const table = page.locator('tbody tr').first();

    // Verify that at least one row is visible (table is not empty)
    await expect(table).toBeVisible();

})

/**
TC06: Assert the ISBN column contains only string values
1.Navigate to /practice/data-table
2.Wait for table to load
3.In Selenium: collect all 5th column (ISBN) cells with findElements(By.xpath('//tbody/tr/td[5]'))
4.Call getText() on each and assert each value is a non-empty string
5.In Playwright: page.locator('tbody tr td:nth-child(5)').allInnerTexts() — assert all are non-empty
 */

test('TC06: Assert the ISBN column contains only string values', async ({ page }) => {

    // Wait for the page to finish loading all network activity
    await page.waitForLoadState('networkidle', { timeout: 60000 });

    // Locate all cells in the ISBN column (5th column in tbody rows)
    const isbncells = page.locator('//tbody/tr/td[5]');

    // Extract all text values from ISBN column cells
    const values = await isbncells.allTextContents();

    // Log values for debugging
    console.log(values);

    // Validate each ISBN value is a string
    for (let value of values) {
        expect(typeof value).toBe('string');
    }

})
