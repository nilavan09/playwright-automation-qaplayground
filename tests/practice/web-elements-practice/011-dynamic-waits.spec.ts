import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice/dynamic-waits')

})

/**
TC01: Wait for a delayed browser alert to appear and accept it1.
1.Navigate to /practice/dynamic-waits
2.Locate the 'Trigger Delayed Alert' button using data-testid='btn-delayed-alert'
3.Click the button — an alert appears after a 2-second delay
4.In Selenium: WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5)); wait.until(ExpectedConditions.alertIsPresent()); driver.switchTo().alert().accept()
5.In Playwright: page.on('dialog', dialog => dialog.accept()); await page.click('[data-testid="btn-delayed-alert"]')
6.Assert the alert was accepted without a timeout exception
 */

test('TC01: Wait for a delayed browser alert and accept it', async ({ page }) => {

  //Click button and wait for alert simultaneously
    const [dialog] = await Promise.all([
    page.waitForEvent('dialog'),
    page.getByTestId('btn-delayed-alert').click()
  ]);

  //Assert dialog type
  expect(dialog.type()).toBe('alert')

  //Accept alert
  await dialog.accept()
})

/**
TC02: Wait for a hidden element to become visible after a delay
1.Navigate to /practice/dynamic-waits
2.Locate the 'Show Element' button using data-testid='btn-show-element'
3.Click the button — a text element appears after a 3-second delay
4.In Selenium: wait.until(ExpectedConditions.visibilityOfElementLocated(By.id('delayed-element')))
5.In Playwright: await page.waitForSelector('[data-testid="delayed-element"]', { state: 'visible' })
6.Assert the element text is 'Element is now visible!' once it appears
 */
test('TC02: Wait for a hidden element to become visible after a delay', async ({ page }) => {

  const button =page.getByTestId('btn-show-element')
  await button.click()
  await page.waitForSelector('[id="delayed-element"]',{state:'visible'})
  await expect(page.getByTestId('delayed-element')).toHaveText('Element is now visible!') 
})

/**
TC03: Wait for a disabled button to become enabled
1.Navigate to /practice/dynamic-waits
2.Locate the disabled button using data-testid='btn-enable-after-delay'
3.Assert the button is initially disabled using isEnabled() or toBeDisabled()
4.Click 'Activate Button' to start the countdown — button enables after 3 seconds
5.In Selenium: wait.until(ExpectedConditions.elementToBeClickable(By.id('btn-enable-after-delay')))
6.In Playwright: await expect(page.locator('[data-testid="btn-enable-after-delay"]')).toBeEnabled()
 */
test('TC03: Wait for a disabled button to become enabled', async ({ page }) => {

  const disablebutton =page.getByTestId('btn-enable-after-delay')
  const activebutton = page.getByTestId('btn-activate-trigger')
  await expect(disablebutton).toBeDisabled()
  await activebutton.click()
  await expect(disablebutton).toBeEnabled()

})

/**
TC04: Wait for loading text to change to a loaded state
1.Navigate to /practice/dynamic-waits
2.Locate the 'Load Data' button using data-testid='btn-load-data'
3.Click the button — status text changes from 'Loading...' to 'Data Loaded!'
4.In Selenium: wait.until(ExpectedConditions.textToBePresentInElementLocated(By.id('load-status'), 'Data Loaded!'))
5.In Playwright: await expect(page.locator('[data-testid="load-status"]')).toHaveText('Data Loaded!')
6.Assert the final text is 'Data Loaded!' and loading state is gone
 */
test('TC04: Wait for loading text to change to a loaded state', async ({ page }) => {

  const loadingbutton =page.getByTestId('btn-load-data')    
  await loadingbutton.click()
  await expect(page.getByTestId('load-status')).toHaveText('Data Loaded!')
})
/**
TC05: Wait for a spinner to disappear before asserting completion
1.Navigate to /practice/dynamic-waits
2.Locate the 'Start Spinner' button using data-testid='btn-start-spinner'
3.Click the button — a spinner appears and disappears after a delay
4.In Selenium: wait.until(ExpectedConditions.invisibilityOfElementLocated(By.id('spinner')))
5.In Playwright: await page.waitForSelector('[data-testid="spinner"]', { state: 'hidden' })
6.Assert the spinner element is no longer visible and the done message appears
 */
test('TC05: Wait for a spinner to disappear before asserting completion', async ({ page }) => {

  const spingbutton =page.getByTestId('btn-start-spinner') 
  await expect(page.getByTestId('spinner-done')).toBeHidden()
  await spingbutton.click()
  await expect(page.getByTestId('spinner-done')).toBeVisible()
  await expect(page.getByTestId('spinner-done')).toHaveText('Done! Spinner gone.')
})
