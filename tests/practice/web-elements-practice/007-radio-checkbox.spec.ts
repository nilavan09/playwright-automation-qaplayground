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
 
    const radiobutton = page.getByTestId('radio-yes-1')
    await radiobutton.click()
    await expect(radiobutton).toBeChecked()
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
 
    const radiobutton1 = page.getByTestId('radio-yes-1')
    await radiobutton1.click()
    await expect(radiobutton1).toBeChecked()

    const radiobutton2 = page.getByTestId('radio-no-1')
    await radiobutton2.click()

    await expect(radiobutton1).not.toBeChecked()
    await expect(radiobutton2).toBeChecked()
})

/**
TC03: Verify only one radio button can be selected at a time
1.Navigate to /practice/radio-checkbox
2.Click each radio button in the group one by one
3.After each click assert only the clicked radio is selected
4.Assert all others are deselected
 */

test('TC03: Verify only one radio button can be selected at a time', async ({ page }) => {
 
    const yes = page.getByTestId('radio-yes-2')
    const no = page.getByTestId('radio-no-2')

    await yes.click()
    await expect(no).not.toBeChecked()

    await no.click()
    await expect(yes).not.toBeChecked()

})

/**
TC04: Verify radio button label text is correct
1.Navigate to /practice/radio-checkbox
2.Locate each radio button label
3.Assert the label text matches the expected value for each option
 */

test('TC04: Verify radio button label text is correct', async ({ page }) => {
 
 const labels = page.locator('label')
 

  await expect(labels.nth(0)).toHaveText('Yes')
  await expect(labels.nth(1)).toHaveText('No')

})

/**
TC05: Verify radio button state persists after page interaction
1.Navigate to /practice/radio-checkbox
2.Select a radio button
3.Interact with other elements on the page
4.Assert the originally selected radio button is still selected
 */

test('TC05: Verify radio button state persists after page interaction', async ({ page }) => {
 
    const radiobutton1 = page.getByTestId('radio-yes-1')
    await radiobutton1.click()
    const radiobutton2 = page.getByTestId('radio-yes-2')
    await radiobutton2.click()
    await expect(radiobutton1).toBeChecked()

})

/**
TC06: Verify checkbox can be checked
1.Navigate to /practice/radio-checkbox
2.Locate a checkbox using its data-testid or id
3.Click the checkbox to check it
4.Assert isSelected() or isChecked() returns true
 */
test('TC06: Verify checkbox can be checked', async ({ page }) => {
 
    const checkbox = page.getByTestId('checkbox-terms')
    await checkbox.click()
    await expect(checkbox).toBeChecked()
})

/**
TC07: Verify checkbox can be unchecked
1.Navigate to /practice/radio-checkbox
2.Locate a checked checkbox
3.Click the checkbox to uncheck it
4.Assert isSelected() or isChecked() returns false
 */
test('TC07: Verify checkbox can be unchecked', async ({ page }) => {
 
    const checkbox = page.getByTestId('checkbox-remember-me')
    await checkbox.click()
    await expect(checkbox).not.toBeChecked()
})

/**
TC08: Verify multiple checkboxes can be selected simultaneously
1.Navigate to /practice/radio-checkbox
2.Click the first checkbox and assert it is checked(by default its already checked in the site)
3.Click the second checkbox and assert it is checked
4.Assert both checkboxes remain checked at the same tim
 */
test('TC08: Verify multiple checkboxes can be selected simultaneously', async ({ page }) => {
    const checkbox1 = page.getByTestId('checkbox-remember-me')
    const checkbox2 = page.getByTestId('checkbox-terms')
    await checkbox2.click()
    await expect(checkbox2).toBeChecked()

    await expect(checkbox1).toBeChecked()
})

/**
TC09: Verify radio buttons are keyboard navigable
1.Navigate to /practice/radio-checkbox
2.Tab to the radio button group
3.Use arrow keys to navigate between options
4.Assert each focused radio button is selected on focus
 */

test('TC09: Verify radio buttons are keyboard navigable', async ({ page }) => {
  await page.reload()
    for(let i=0;i<12;i++){
     await page.keyboard.press('Tab')
  }
  const noradio = page.getByTestId('radio-no-1')
  const yesradio = page.getByTestId('radio-yes-1')

  await page.keyboard.press('ArrowRight') 
  // one of them should be selected
  await expect(noradio).toBeChecked()

  await page.keyboard.press('ArrowRight')
  // still only one selected (radio behavior)
  await expect(yesradio).toBeChecked()

  
})

/**
TC10: Verify checkbox is keyboard togglable
1.Navigate to /practice/radio-checkbox
2.Tab to a checkbox element
3.Press Space to check it
4.Assert the checkbox is now checked
5.Press Space again and assert it is unchecked
*/

test('TC10: Verify checkbox is keyboard togglable', async ({ page }) => {
    await page.reload()
    const checkbox = page.getByTestId('checkbox-terms')
    for(let i=0;i<25;i++){
        const isfocused=await checkbox.evaluate(el=>el===document.activeElement)
        if(isfocused) break
     await page.keyboard.press('Tab')
     
  }
    await page.keyboard.press('Space')
    
    await expect(checkbox).toBeChecked()
})
/**
TC11 & 12: Verify disabled radio button cannot be selected( TC 12 = disabled checknox not avail on site)
1.Navigate to /practice/radio-checkbox
2.Locate a disabled radio button
3.Attempt to click the disabled radio button
4.Assert the radio button remains unselected
5.Assert isEnabled() returns false
 */

test('TC11: Verify disabled radio button cannot be selected', async ({ page }) => {
    const disablebutton = page.getByTestId('radio-maybe')
    await expect(disablebutton).toBeDisabled()
    await expect(disablebutton).not.toBeChecked()
    expect(await disablebutton.isEnabled()).toBeFalsy()
})

/**
TC13: Verify radio button group is accessible to screen readers
1.Navigate to /practice/radio-checkbox
2.Verify each radio button has an associated label (for/id linkage)
3.Verify the radio group has a fieldset and legend or aria-label
4.Assert aria-checked attribute reflects current selection state
 */

test('TC13: Verify radio button group is accessible to screen readers', async ({ page }) => {
  const yes = page.getByTestId('radio-yes-1')
  const no = page.getByTestId('radio-no-1')

  // Step 2: Verify label wrapping (instead of for/id)
  const yesLabel = yes.locator('xpath=ancestor::label')
  await expect(yesLabel).toBeVisible()

  const noLabel = no.locator('xpath=ancestor::label')
  await expect(noLabel).toBeVisible()


  // Step 4: Verify selection state (use checked, NOT aria-checked)
  await yes.check()

  await expect(yes).toBeChecked()
  await expect(no).not.toBeChecked()
   
})

/**
TC14: Verify radio button visual state changes on selection
1.Navigate to /practice/radio-checkbox
2.Observe unselected radio button appearance
3.Click the radio button
4.Assert the visual indicator (filled circle) appears
 */

test.skip('TC14: Verify radio button visual state changes on selection', async ({ page }) => {
 
await page.setViewportSize({ width: 1280, height: 720 })
const radiobutton = page.getByTestId('radio-bug-yes')
const wrapper = page.locator('label:has(#radio-bug-yes)')
await expect(radiobutton).not.toBeChecked()
await expect(wrapper).toHaveScreenshot('radio-before.png',{maxDiffPixelRatio: 0.02})
await radiobutton.click()
await expect(radiobutton).toBeChecked()
await expect(wrapper).toHaveScreenshot('radio-after.png',{maxDiffPixelRatio: 0.02})

})

/**
TC15: Verify radio and checkbox elements load without errors
1.Navigate to /practice/radio-checkbox
2.Assert the page loads with HTTP 200 status
3.Assert no console errors are present
4.Assert all radio buttons and checkboxes are visible on the page
 */

test('TC15: Verify radio and checkbox elements load without errors', async ({ page }) => {
 
const response =await page.goto('https://www.qaplayground.com/practice/radio-checkbox')
expect(response?.status()).toBe(200)

const errorslist:string[]=[]
page.on('pageerror',pe=>{
    errorslist.push(pe.message)
})
expect(errorslist.length).toBe(0)

const buttons=[
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
]

for(let button of buttons){
    await expect(page.getByTestId(button)).toBeVisible()
}
})

        