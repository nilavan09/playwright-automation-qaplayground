import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice/tabs-windows')

})

/**
TC01: Open a link in a new tab and switch to it
1.Navigate to /practice/tabs-windows
2.Locate the 'Open Home Page' button using data-testid='btn-open-home-tab'
3.Click the button — a new tab opens with the home page
4.In Selenium: String newTab = driver.getWindowHandles().stream().reduce((a, b) -> b).get(); driver.switchTo().window(newTab)
5.In Playwright: const [newPage] = await Promise.all([context.waitForEvent('page'), page.click('[data-testid="btn-open-home-tab"]')])
6.Assert the new tab title contains 'QA Playground'
 */

test('TC01: Verify radio button is selected on click', async ({ page,context }) => {
 
    const button = page.getByTestId('btn-open-home-tab')

    const [newpage]= await Promise.all([
    context.waitForEvent('page'),
    button.click()
    ])
   
    await expect(newpage).toHaveTitle('QA Playground — Practice Selenium, Playwright & Cypress')
})

/**
TC02: Open multiple windows and print all window titles(website not suporting multiple windows)
1.Navigate to /practice/tabs-windows
2.Locate the 'Open Multiple Windows' button using data-testid='btn-open-multiple-windows'
3.Click the button — additional windows/tabs open
4.In Selenium: Set<String> handles = driver.getWindowHandles(); iterate and call driver.switchTo().window(handle); driver.getTitle()
5.In Playwright: const pages = context.pages(); for (const p of pages) console.log(await p.title())
6.Assert at least 2 window handles / pages exist after clicking
 */

test('TC02: Open multiple windows and print all window titles', async ({ page,context }) => {
 
    const button = page.getByTestId('btn-open-multiple-windows')

    const [newpage]= await Promise.all([
    context.waitForEvent('page'),
    button.click()
    ])
   
    await expect(newpage).toHaveTitle('How to Handle Dropdowns using Select Class in Selenium and Playwright')
})
/**
TC03: Switch back to the parent window after switching to child
1.Navigate to /practice/tabs-windows
2.Store the parent window handle: String parent = driver.getWindowHandle()
3.Click 'Open Home Page' to open a child tab
4.Switch to the child tab and assert its title
5.Switch back: driver.switchTo().window(parent)
6.Assert the current page title matches the tabs-windows page title
 */
test('TC03: Switch back to the parent window after switching to child', async ({ page,context }) => {
 
    const button = page.getByTestId('btn-open-home-tab')

    const parentpage=page

    const [childpage] = await Promise.all([
        context.waitForEvent('page'), 
        button.click()
    ])
    await childpage.waitForLoadState()
    await expect(childpage).toHaveTitle('QA Playground — Practice Selenium, Playwright & Cypress')
    await parentpage.bringToFront()
    await expect(parentpage).toHaveTitle('How to Handle Multiple Windows and Tabs in Selenium and Playwright')
})

/**
TC04: Close the child window and verify focus returns to parent
1.Navigate to /practice/tabs-windows
2.Open a child tab using the 'Open Home Page' button
3.Switch to the child tab
4.Close the child: driver.close() (Selenium) or newPage.close() (Playwright)
5.Switch back to parent: driver.switchTo().window(parentHandle)
6.Assert only one window handle remains and the parent page is active
 */
test('TC04: Close the child window and verify focus returns to parent', async ({ page,context }) => {
 
    const button = page.getByTestId('btn-open-multiple-windows')

    const parentpage=page

    const [childpage] = await Promise.all([
        context.waitForEvent('page'),
        button.click()
    ])
    await childpage.waitForLoadState()
    await expect(childpage).toHaveTitle('How to Handle Dropdowns using Select Class in Selenium and Playwright')
    await childpage.close()
    await expect(parentpage).toHaveTitle('How to Handle Multiple Windows and Tabs in Selenium and Playwright')
})

/**
TC05: Verify Ctrl+click opens a link in a new tab
1.Navigate to /practice/tabs-windows
2.Locate any link on the page
3.In Selenium: new Actions(driver).keyDown(Keys.CONTROL).click(link).keyUp(Keys.CONTROL).perform()
4.In Playwright: page.click('a', { modifiers: ['Control'] })
5.Assert a new tab opens — driver.getWindowHandles().size() > 1 or context.pages().length > 1
 */
test('TC05: Verify Ctrl+click opens a link in a new tab', async ({ page,context }) => {
 
    const button = page.getByTestId('btn-open-multiple-windows')

    const [childpage] = await Promise.all([
        context.waitForEvent('page'),
        button.click({modifiers:['Control']})
    ])
    await childpage.waitForLoadState()
    const pagescount = context.pages().length
    expect(pagescount).toBe(2)
    
})