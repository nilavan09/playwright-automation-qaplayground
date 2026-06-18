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

test('TC01: Verify successful movie name input', async ({ page }) => {

    // Locate the movie name text field using its id attribute.
    const inputfield = page.locator('input[id=movieName]');

    // Enter the movie name into the input field.
    await inputfield.fill('Fight club');

    // Retrieve the entered value and verify it contains "Fight club".
    // const entered = await inputfield.inputValue();
    // expect(entered).toContain('Fight club');

    // Verify that the input field value exactly matches "Fight club".
    await expect(inputfield).toHaveValue('Fight club');

});

/**
TC02: Verify input placeholder disappears on typing
1.Open browser and navigate to /practice/input-fields
2.Locate the movie name input using data-testid='input-movie-name'
3.Verify placeholder text 'Enter hollywood movie name' is visible
4.Type any text into the input field
5.Assert the placeholder text is no longer visible
 */

test('TC02: Verify input placeholder disappears on typing', async ({ page }) => {

    // Locate the movie name input field using its id.
    const placeholdertext = page.locator('input[id=movieName]');

    // Verify that the input field initially displays the expected placeholder text.
    await expect(placeholdertext).toHaveAttribute(
        'placeholder',
        'Enter hollywood movie name'
    );

    // Enter a movie name into the input field.
    await placeholdertext.fill('Transformers');

    // Wait briefly to observe the entered value (optional).
    await page.waitForTimeout(500);

    // Verify that the input field contains the entered movie name.
    await expect(placeholdertext).toHaveValue('Transformers');

    // Retrieve the current value from the input field.
    const inputvalue = await placeholdertext.inputValue();

    // Print the entered value to the console for debugging purposes.
    console.log(inputvalue);

    // Alternative approach:
    // Enter "Batman" into the input field.
    // await page.fill('input[id=movieName]', 'Batman');

    // Verify that the input field contains "Batman".
    // await expect(placeholdertext).toHaveValue('Batman');
});

/**
TC03: Verify keyboard tab triggers focus change after append
1.Open browser and navigate to /practice/input-fields
2.Locate the append input using data-testid='input-append-text'
3.Click the input to focus it
4.Append text to the existing value 'I am good'
5.Press Tab using Keys.TAB (Selenium) or press('Tab') (Playwright)
6.Verify focus has shifted to the next focusable element
 */

test('TC03: Verify keyboard tab triggers focus change after append', async ({ page }) => {

    // Locate the append text input field and the next input element.
    const inputfield = page.locator('input[id=appendText]');
    const nextelement = page.locator('input[id=insideText]');

    // Click the append text field to place the cursor inside it.
    await inputfield.click();

    // Type " Man" character by character into the input field.
    await inputfield.pressSequentially(' Man');

    // Press the Tab key to move focus to the next focusable element.
    await inputfield.press('Tab');

    // Wait briefly to allow the focus transition to complete (optional).
    await page.waitForTimeout(200);

    // Verify that focus has moved to the next input field.
    await expect(nextelement).toBeFocused();

});

/**
TC04: Verify appended text value is retained in the field
1.Open browser and navigate to /practice/input-fields
2.Locate the append input using data-testid='input-append-text'
3.Note the existing value 'I am good'
4.Append additional text to the input
5.Assert the input value contains both the original and appended text
 */

test('TC04: Verify appended text value is retained in the field', async ({ page }) => {

    // Locate the append text input field using its test id.
    const inputfield = page.getByTestId('input-append-text');

    // Verify that the input field initially contains the default value.
    // const val = await inputfield.inputValue();
    await expect(inputfield).toHaveValue('I am good');

    // Click the input field to place the cursor inside it.
    await inputfield.click();

    // Append " Man" to the existing text character by character.
    await inputfield.pressSequentially(' Man');

    // Wait briefly to observe the updated value (optional).
    await page.waitForTimeout(200);

    // Verify that the original text is retained and the new text is appended.
    await expect(inputfield).toHaveValue('I am good Man');

});

/**
TC05: Verify text present inside input field matches expected value
1.Open browser and navigate to /practice/input-fields
2.Locate the verify text input using data-testid='input-verify-text'
3.Read the current value of the input field
4.Assert the value equals 'QA PlayGround'
 */
test('TC05: Verify text present inside input field matches expected value', async ({ page }) => {

    // Locate the verify-text input field using its test id.
    const inputfield = page.getByTestId('input-verify-text');

    // Retrieve the current value present in the input field.
    const value = await inputfield.inputValue();

    // Print the retrieved value to the console for debugging purposes.
    console.log(value);

    // Verify that the input field contains the expected text.
    await expect(inputfield).toHaveValue('QA PlayGround');

})

/**
TC06: Verify getAttribute returns the correct input value
1.Open browser and navigate to /practice/input-fields
2.Locate the verify text input using data-testid='input-verify-text'
3.Call getAttribute('value') on the input element
4.Assert the returned string equals 'QA PlayGround'
*/
test('TC06: Verify getAttribute returns the correct input value', async ({ page }) => {

    // Locate the input field used for the value attribute check.
    const inputfield = page.locator('input[id=insideText]');

    // Retrieve the value attribute from the input field.
    const value = await inputfield.getAttribute('value');

    // Verify that the retrieved attribute value contains the expected text.
    expect(value).toContain('QA PlayGround'); // Generic assertion

    // Verify that the input field displays the expected value.
    await expect(inputfield).toHaveValue('QA PlayGround'); // Locator assertion

})

/**
TC07: Verify input field text can be cleared successfully
1.Open browser and navigate to /practice/input-fields
2.Locate the clear text input using data-testid='input-clear-text'
3.Verify the input contains the value 'QA PlayGround Clear Me'
4.Call clear() (Selenium) or fill('') (Playwright) on the input
5.Assert the input field is now empty
 */
test('TC07: Verify input field text can be cleared successfully', async ({ page }) => {

    // Locate the input field that contains text to be cleared.
    const inputfield = page.getByTestId('input-clear-text');

    // Verify that the input field initially contains the expected text.
    await expect(inputfield).toHaveValue('QA PlayGround Clear Me');

    // Clear the existing text from the input field.
    await inputfield.fill('');

    // Verify that the input field is empty after clearing.
    await expect(inputfield).toHaveValue('');

})

/**
TC08: Verify field is empty after executing clear action
1.Open browser and navigate to /practice/input-fields
2.Locate the clear text input using data-testid='input-clear-text'
3.Execute clear action on the input field
4.Assert getAttribute('value') returns an empty string
5.Or assert inputValue() returns '' (Playwright)
 */

test('TC08: Verify field is empty after executing clear action', async ({ page }) => {

    // Locate the clear text input field using its id.
    const inputfield = page.locator('input[id=clearText]');

    // Remove any existing text from the input field.
    await inputfield.fill('');

    // Retrieve the current value attribute from the input field.
    const attri = await inputfield.getAttribute('value');

    /**
     * Easy way to remember:
     * - Value in hand (string, number, boolean) → Generic assertion (no await).
     * - Element/locator (UI state) → Locator assertion (use await).
     */

    // Verify that the retrieved attribute value is empty.
    expect(attri).toEqual(''); // Generic assertion

    // Verify that the input field itself is empty.
    await expect(inputfield).toHaveValue(''); // Locator assertion

});

/**
TC09: Verify disabled input field cannot be edited by user
1.Open browser and navigate to /practice/input-fields
2.Locate the disabled input using data-testid='input-disabled'
3.Verify the input element has the disabled attribute
4.Attempt to type text in the disabled field
5.Assert the value remains 'Enter' unchanged
 */
test('TC09: Verify disabled input field cannot be edited by user', async ({ page }) => {

    // Locate the disabled input field.
    const inputfield = page.locator('input[data-testid=input-disabled]');

    // Verify that the input field is disabled and cannot be edited.
    await expect(inputfield).toBeDisabled();

    // Retrieve the current value attribute from the input field.
    const value = await inputfield.getAttribute('value');

    // Verify that the field contains the expected text.
    expect(value).toContain('Enter');

})
/**
TC10: Verify isEnabled() returns false for disabled input
1.Open browser and navigate to /practice/input-fields
2.Locate the disabled input using data-testid='input-disabled'
3.Call isEnabled() on the element (Selenium)
4.Assert the result is false
5.Or use expect(locator).toBeDisabled() assertion (Playwright)
 */
test('TC10: Verify isEnabled() returns false for disabled input', async ({ page }) => {

    // Locate the input field whose enabled state needs to be verified.
    const inputfield = page.locator('input[data-testid=input-disabled]');

    // Verify that the input field is disabled and cannot accept user input.
    await expect(inputfield).toBeDisabled();

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
test('TC12: Verify getAttribute returns correct readonly attribute value', async ({ page }) => {

    // Locate the readonly input field for attribute validation.
    const inputfield = page.locator('input[data-testid=input-readonly]');

    // Click the field to ensure it is accessible for interaction.
    await inputfield.click();

    // Retrieve the readonly attribute value and verify that it is present.
    expect(await inputfield.getAttribute('readonly')).toEqual(''); // Generic assertion

    // Verify that the input field has the readonly attribute.
    await expect(inputfield).toHaveAttribute('readonly'); // Locator assertion

})

//check box testcase- for reference
test('TC13: Verify button is accessible to screen readers', async ({ page }) => {

    // Navigate to the application under test.
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Locate all checkbox inputs on the page.
    const locator = page.locator("//input[contains(@class,'form-check-input') and @type='checkbox']");

    // Get the total number of checkboxes found.
    const length = await locator.count();

    // Iterate through each checkbox.
    for (let i = 0; i < length; i++) {

        // Click the current checkbox.
        await locator.nth(i).click();

        // Verify that the clicked checkbox is selected.
        await expect(locator.nth(i)).toBeChecked();

    }
})

// Total 13 test cases are implemented for input field practice.