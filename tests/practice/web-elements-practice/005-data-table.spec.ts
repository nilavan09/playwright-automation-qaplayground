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

    await page.waitForTimeout(3000)
    const table = page.getByTestId('books-table')
    const vaue = await table.allTextContents()
    await expect(page.getByTestId('col-sr')).toHaveText('Sr No.')
    await expect(page.getByTestId('col-title')).toHaveText('Book Name')
    await expect(page.getByTestId('col-genre')).toHaveText('Book Genre')
    await expect(page.getByTestId('col-author')).toHaveText('Book Author')
    await expect(page.getByTestId('col-isbn')).toHaveText('Book ISBN')
    await expect(page.getByTestId('col-published')).toHaveText('Book Published')
    console.log(vaue)

    //playwright way
    const headers = table.getByRole('columnheader');

    await expect(headers).toHaveCount(6);

    await expect(headers).toHaveText([
        'Sr No.',
        'Book Name',
        'Book Genre',
        'Book Author',
        'Book ISBN',
        'Book Published'
    ]);


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

    await page.waitForLoadState('networkidle', { timeout: 60000 });
    const table = page.getByTestId('books-table')
    const headers = table.getByRole('row')
    const value = await headers.count()
    expect(value).toEqual(11)
    console.log(value)

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
    //- //tbody/tr[1]/td[1]
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    const table = page.getByTestId('books-table')
    const value= await table.locator('tbody tr').nth(0).locator('td').nth(2).textContent()
    expect(value).toBeTruthy()
    expect(value?.trim().length).toBeGreaterThan(0)
    expect(value?.trim().length).not.toBe('')
    expect(value).not.toBeNull()
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
    
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    const table = page.getByTestId('books-table')
    const val=table.getByRole('row').filter({hasText:'Book Author'})
    await expect(val).toBeVisible()
   
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
    
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    const table = page.locator('tbody tr').first()
    await expect(table).toBeVisible()
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
    
    await page.waitForLoadState('networkidle', { timeout: 60000 });
    const isbncells = page.locator('//tbody/tr/td[5]')
    const values = await isbncells.allTextContents()
    console.log(values)
    for(let value of values){
        expect(typeof value).toBe('string')
    }
})
