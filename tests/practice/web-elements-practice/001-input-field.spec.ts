import {expect, test} from '@playwright/test'


test.beforeEach(async({page})=>{
 await page.goto('https://www.qaplayground.com/practice/input-fields')

})
/**
TC01: Verify successful movie name input
1.Open browser and navigate to /practice/input-fields
2.Locate the movie name input using data-testid='input-movie-name'
3.Type a valid movie name e.g. 'Inception' using sendKeys() or fill()
4.Read the input value using getAttribute('value') or inputValue()
5.Assert the returned value equals 'Inception'
*/

test('TC01: Verify successful movie name input', async({page})=>{

    // Locate the movie name input field by id.
    const inputfield = page.locator('input[id=movieName]')
    await inputfield.fill('Fight club')
    // const entered =await inputfield.inputValue()
    // expect(entered).toContain('Fight club')
    await (expect(inputfield).toHaveValue('Fight club'))

})

/**
TC02: Verify input placeholder disappears on typing
1.Open browser and navigate to /practice/input-fields
2.Locate the movie name input using data-testid='input-movie-name'
3.Verify placeholder text 'Enter hollywood movie name' is visible
4.Type any text into the input field
5.Assert the placeholder text is no longer visible
 */

test('TC02: Verify input placeholder disappears on typing', async({page})=>{

    // Locate the same movie name input field.
    const placeholdertext = page.locator('input[id=movieName]')
    await (expect(placeholdertext).toHaveAttribute('placeholder','Enter hollywood movie name'))
    await placeholdertext.fill('Transformers')
    await page.waitForTimeout(500)
    expect(placeholdertext).toHaveValue('Transformers')

    const inputvalue = await placeholdertext.inputValue()
    console.log(inputvalue)

    // await page.fill('input[id=movieName]',"Batman")
    // expect(placeholdertext).toHaveValue('Batman')
})

/**
TC03: Verify keyboard tab triggers focus change after append
1.Open browser and navigate to /practice/input-fields
2.Locate the append input using data-testid='input-append-text'
3.Click the input to focus it
4.Append text to the existing value 'I am good'
5.Press Tab using Keys.TAB (Selenium) or press('Tab') (Playwright)
6.Verify focus has shifted to the next focusable element
 */

test('TC03: Verify keyboard tab triggers focus change after append', async({page})=>{

    // Locate the append input and the next focusable element.
    const inputfield = page.locator('input[id=appendText]')
    const nextelement =page.locator('input[id=insideText]')
    await inputfield.click()
    await inputfield.pressSequentially(' Man')
    await inputfield.press('Tab')
    await page.waitForTimeout(200)
    await expect(nextelement).toBeFocused()

})

/**
TC04: Verify appended text value is retained in the field
1.Open browser and navigate to /practice/input-fields
2.Locate the append input using data-testid='input-append-text'
3.Note the existing value 'I am good'
4.Append additional text to the input
5.Assert the input value contains both the original and appended text
 */

test('TC04: Verify appended text value is retained in the field', async({page})=>{

    // Locate the append input using its test id.
    const inputfield = page.getByTestId('input-append-text')
    // const val= await inputfield.inputValue()
    expect(inputfield).toHaveValue('I am good')
    await inputfield.click()
    await inputfield.pressSequentially(' Man')
    await page.waitForTimeout(200)
    await expect(inputfield).toHaveValue('I am good Man')

})

/**
TC05: Verify text present inside input field matches expected value
1.Open browser and navigate to /practice/input-fields
2.Locate the verify text input using data-testid='input-verify-text'
3.Read the current value of the input field
4.Assert the value equals 'QA PlayGround'
 */
test('TC05: Verify text present inside input field matches expected value', async({page})=>{

    // Locate the verify-text input field.
    const inputfield = page.getByTestId('input-verify-text')
    const value = await inputfield.inputValue()
    console.log(value)
    await expect(inputfield).toHaveValue('QA PlayGround')
})

/**
TC06: Verify getAttribute returns the correct input value
1.Open browser and navigate to /practice/input-fields
2.Locate the verify text input using data-testid='input-verify-text'
3.Call getAttribute('value') on the input element
4.Assert the returned string equals 'QA PlayGround'
*/
test('TC06: Verify getAttribute returns the correct input value', async({page})=>{

    // Locate the input field for the getAttribute value check.
    const inputfield = page.locator('input[id=insideText]')
    const value = await inputfield.getAttribute('value')
    expect(value).toContain('QA PlayGround')// GenericAssertions
    await expect(inputfield).toHaveValue('QA PlayGround')//LocatorAssertions
})

/**
TC07: Verify input field text can be cleared successfully
1.Open browser and navigate to /practice/input-fields
2.Locate the clear text input using data-testid='input-clear-text'
3.Verify the input contains the value 'QA PlayGround Clear Me'
4.Call clear() (Selenium) or fill('') (Playwright) on the input
5.Assert the input field is now empty
 */
test('TC07: Verify input field text can be cleared successfully', async({page})=>{

    // Locate the clear text input field.
    const inputfield = page.getByTestId('input-clear-text')
    expect(inputfield).toHaveValue('QA PlayGround Clear Me')
    await inputfield.fill('')
    await expect (inputfield).toHaveValue('')
})

/**
TC08: Verify field is empty after executing clear action
1.Open browser and navigate to /practice/input-fields
2.Locate the clear text input using data-testid='input-clear-text'
3.Execute clear action on the input field
4.Assert getAttribute('value') returns an empty string
5.Or assert inputValue() returns '' (Playwright)
 */

test('TC08: Verify field is empty after executing clear action', async({page})=>{

    // Locate the clear text input by id.
    const inputfield = page.locator('input[id=clearText]')
    await inputfield.fill('')
    const attri = await inputfield.getAttribute('value')
    /**
     *Easy way to remember
     Value in hand (string, number, boolean) → no await ==> generic assertion.
     Element/locator (UI state) → use await ==> locator assertion.
     */
    expect(attri).toEqual('')//generic assertion
    await expect(inputfield).toHaveValue('')// locator assertion 
})

/**
TC09: Verify disabled input field cannot be edited by user
1.Open browser and navigate to /practice/input-fields
2.Locate the disabled input using data-testid='input-disabled'
3.Verify the input element has the disabled attribute
4.Attempt to type text in the disabled field
5.Assert the value remains 'Enter' unchanged
 */
test('TC09: Verify disabled input field cannot be edited by user', async({page})=>{

    // Locate the disabled input field.
    const inputfield = page.locator('input[data-testid=input-disabled]')
    expect(inputfield).toBeDisabled()
    const value = await inputfield.getAttribute('value')
    expect(value).toContain('Enter')
})
/**
TC10: Verify isEnabled() returns false for disabled input
1.Open browser and navigate to /practice/input-fields
2.Locate the disabled input using data-testid='input-disabled'
3.Call isEnabled() on the element (Selenium)
4.Assert the result is false
5.Or use expect(locator).toBeDisabled() assertion (Playwright)
 */
test('TC10: Verify isEnabled() returns false for disabled input', async({page})=>{

    // Locate the disabled input field for the enabled-state check.
    const inputfield = page.locator('input[data-testid=input-disabled]')
    await expect(inputfield).toBeDisabled()
})

/**
TC11: Verify readonly input field does not accept user typing
1.Open browser and navigate to /practice/input-fields
2.Locate the readonly input using data-testid='input-readonly'
3.Attempt to type text into the readonly field
4.Assert the value remains 'This text is readonly' unchanged
 */
test('TC11: Verify readonly input field does not accept user typing', async({page})=>{

    // Locate the readonly input field.
    const inputfield = page.locator('input[data-testid=input-readonly]')
    await expect(inputfield).not.toBeEditable()
    await expect(inputfield).toHaveValue('This text is readonly')

    await inputfield.click()
    expect(await inputfield.getAttribute('value')).toEqual('This text is readonly')


})
/**
TC12: Verify getAttribute returns correct readonly attribute value
1.Open browser and navigate to /practice/input-fields
2.Locate the readonly input using data-testid='input-readonly'
3.Call getAttribute('readonly') on the element (Selenium)
4.Assert the attribute is present on the element
5.Or use expect(locator).toHaveAttribute('readonly') (Playwright)
 */
test('TC12: Verify getAttribute returns correct readonly attribute value', async({page})=>{

    // Locate the readonly input field for the readonly attribute check.
    const inputfield = page.locator('input[data-testid=input-readonly]')
    await inputfield.click()
    expect(await inputfield.getAttribute('readonly')).toEqual('')
    await expect(inputfield).toHaveAttribute('readonly')


})

//check box testcase- for reference
test('TC1: Verify button is accessible to screen readers', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/')

    // Locate all checkbox inputs on the page.
    const locator = page.locator("//input[contains(@class,'form-check-input') and @type='checkbox']")
    const length=await locator.count()


    for(let i=0; i<length;i++){  
    await locator.nth(i).click()
    expect(locator.nth(i)).toBeChecked()
   }
})