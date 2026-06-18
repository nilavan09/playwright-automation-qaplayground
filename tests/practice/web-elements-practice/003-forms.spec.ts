import {expect, test} from '@playwright/test'
import { error } from 'node:console'


test.beforeEach(async({page})=>{
await page.goto('https://www.qaplayground.com/practice/forms')
})
/**
TC01: Fill all fields with valid data and submit successfully
1.Navigate to /practice/forms
2.Fill input-first-name with 'John'
3.Fill input-last-name with 'Doe'
4.Fill input-email with 'john@examples.com'
5.Fill input-phone with '9876543210'
6.Fill input-dob with a valid date
7.Select radio-gender-male
8.Select 'India' from select-country dropdown
9.Fill input-city with 'Mumbai'
10.Fill input-password with 'pass123'
11.Fill input-confirm-password with 'pass123'
12.Check checkbox-terms
13.Click submit-form-btn
14.Assert form-success-msg is visible
*/

test('TC01: Fill all fields with valid data and submit successfully', async({page})=>{

   // const firstname=await page.getByTestId('input-first-name').fill('John')
   // const lastname=await page.getByTestId('input-last-name').fill('Doe')
   // const email=await page.getByTestId('input-email').fill('john@examples.com')
   // const phone=await page.getByTestId('input-phone').fill('9876543210')
   // const date=await page.getByTestId('input-dob').fill('2000-01-09')
   // const radio=await page.getByTestId('radio-gender-male').click()
   // const dropdown=await page.getByTestId('select-country')
   // await dropdown.click()
   // await page.getByRole('option', { name: 'India' }).click()
   // const city=await page.getByTestId('input-city').fill('Bangalore')
   // const pass=await page.getByTestId('input-password').fill('pass123')
   // const confirmpass=await page.getByTestId('input-confirm-password').fill('pass123')
   // const checknox=await page.getByTestId('checkbox-terms').check()
   // const submit =await page.getByTestId('submit-form-btn').click()
   // expect(page.getByText('Form Submitted Successfully!')).toBeVisible()

   // Fill the first name field
await page.getByTestId('input-first-name').fill('John')

// Fill the last name field
await page.getByTestId('input-last-name').fill('Doe')

// Enter the email address
await page.getByTestId('input-email').fill('john@examples.com')

// Enter the phone number
await page.getByTestId('input-phone').fill('9876543210')

// Fill the date of birth field
await page.getByTestId('input-dob').fill('2000-01-09')

// Select the male gender radio button
await page.getByTestId('radio-gender-male').click()

// Open the country dropdown
await page.getByTestId('select-country').click()

// Select "India" from the dropdown options
await page.getByRole('option', { name: 'India' }).click()

// Enter the city name
await page.getByTestId('input-city').fill('Bangalore')

// Enter the password
await page.getByTestId('input-password').fill('pass123')

// Confirm the password
await page.getByTestId('input-confirm-password').fill('pass123')

// Accept terms and conditions checkbox
await page.getByTestId('checkbox-terms').check()

// Submit the registration form
await page.getByTestId('submit-form-btn').click()

// Verify the success message is displayed after form submission
await expect(
    page.getByText('Form Submitted Successfully!')
).toBeVisible()
})
/**
TC02: Verify required field errors appear on empty submit
1.Navigate to /practice/forms
2.Leave all fields empty
3.Click submit-form-btn
4.Assert error-first-name is visible with required message
5.Assert error-last-name is visible
6.Assert error-email is visible
7.Assert error-phone is visible
8.Assert error-dob is visible
9.Assert error-gender is visible
10.Assert error-country is visible
11.Assert error-city is visible
12.Assert error-password is visible
13.Assert error-confirm-password is visible
14.Assert error-terms is visible
 */

test('TC02: Verify required field errors appear on empty submit', async ({ page }) => {

    // Click the submit button without filling the form
    await page.getByTestId('submit-form-btn').click()

    // Wait for page actions and validation messages to appear
    await page.waitForLoadState()
    await page.waitForTimeout(1000)

    // Verify validation text for all required fields
    await expect(page.getByTestId('error-first-name'))
        .toHaveText('First name is required.')

    await expect(page.getByTestId('error-last-name'))
        .toHaveText('Last name is required.')

    await expect(page.getByTestId('error-email'))
        .toHaveText('Email is required.')

    await expect(page.getByTestId('error-phone'))
        .toHaveText('Phone number is required.')

    await expect(page.getByTestId('error-dob'))
        .toHaveText('Date of birth is required.')

    await expect(page.getByTestId('error-gender'))
        .toHaveText('Please select a gender.')

    await expect(page.getByTestId('error-country'))
        .toHaveText('Please select a country.')

    await expect(page.getByTestId('error-city'))
        .toHaveText('City is required.')

    await expect(page.getByTestId('error-password'))
        .toHaveText('Password is required.')

    await expect(page.getByTestId('error-confirm-password'))
        .toHaveText('Please confirm your password.')

    await expect(page.getByTestId('error-terms'))
        .toHaveText('You must accept the terms.')

    // Verify all validation messages are visible to the user
    await expect(page.getByTestId('error-first-name')).toBeVisible()

    await expect(page.getByTestId('error-last-name')).toBeVisible()

    await expect(page.getByTestId('error-email')).toBeVisible()

    await expect(page.getByTestId('error-phone')).toBeVisible()

    await expect(page.getByTestId('error-dob')).toBeVisible()

    await expect(page.getByTestId('error-gender')).toBeVisible()

    await expect(page.getByTestId('error-country')).toBeVisible()

    await expect(page.getByTestId('error-city')).toBeVisible()

    await expect(page.getByTestId('error-password')).toBeVisible()

    await expect(page.getByTestId('error-confirm-password')).toBeVisible()

    await expect(page.getByTestId('error-terms')).toBeVisible()

})

/**
TC03: Verify invalid email format shows validation error
1.Navigate to /practice/forms
2.Fill input-email with 'notanemail'
3.Click submit-form-btn
4.Assert error-email shows 'Enter a valid email address'
 */
test('TC03: Verify invalid email format shows validation error', async ({ page }) => {

    // Enter an invalid email format into the email field
    await page.getByTestId('input-email').fill('testing')

    // Click the submit button to trigger form validation
    await page.getByTestId('submit-form-btn').click()

    // Verify the correct email validation error message is displayed
    await expect(page.getByTestId('error-email'))
        .toHaveText('Enter a valid email address.')

})

/**
TC04: Verify invalid phone number format shows error
1.Navigate to /practice/forms
2.Fill input-phone with '12345' (less than 10 digits)
3.Click submit-form-btn
4.Assert error-phone shows '10-digit phone number' message
 */
test('TC04: Verify invalid phone number format shows error', async ({ page }) => {

    // Enter an invalid phone number (less than required digits)
    await page.getByTestId('input-phone').fill('1234')

    // Submit the form to trigger validation
    await page.getByTestId('submit-form-btn').click()

    // Small wait to allow validation message to render
    await page.waitForTimeout(300)

    // Verify phone number validation error message is shown
    await expect(page.getByTestId('error-phone'))
        .toHaveText('Enter a valid 10-digit phone number.')

})

/**
TC05: Verify password minimum length validation
1.Navigate to /practice/forms
2.Fill input-password with 'abc' (less than 6 characters)
3.Click submit-form-btn
4.Assert error-password shows 'at least 6 characters' message
 */
test('TC05: Verify password minimum length validation', async ({ page }) => {

    // Enter a short password that does not meet minimum length requirement
    await page.getByTestId('input-password').fill('1')

    // Submit the form to trigger validation
    await page.getByTestId('submit-form-btn').click()

    // Small wait to allow validation message to appear
    await page.waitForTimeout(100)

    // Verify password validation error message is displayed
    await expect(page.getByTestId('error-password'))
        .toHaveText('Password must be at least 6 characters.')

})

/**
TC06: Verify password mismatch shows confirm password error
1.Navigate to /practice/forms
2.Fill input-password with 'pass123'
3.Fill input-confirm-password with 'pass456'
4.Click submit-form-btn
5.Assert error-confirm-password shows 'Passwords do not match' message
 */
test('TC06: Verify password mismatch shows confirm password error', async ({ page }) => {

    // Enter the main password
    await page.getByTestId('input-password').fill('pass123')

    // Enter a different value in confirm password field
    await page.getByTestId('input-confirm-password').fill('pass1234')

    // Submit the form to trigger validation
    await page.getByTestId('submit-form-btn').click()

    // Verify mismatch validation message is displayed
    await expect(page.getByTestId('error-confirm-password'))
        .toHaveText('Passwords do not match.')

})
/**
TC07: Verify T&C checkbox required error appears
1.Navigate to /practice/forms
2.Fill all required fields with valid data
3.Leave checkbox-terms unchecked
4.Click submit-form-btn
5.Assert error-terms shows 'You must accept the terms' message
 */
test('TC07: Verify T&C checkbox required error appears', async ({ page }) => {

    // Click submit without accepting terms and conditions
    await page.getByTestId('submit-form-btn').click()

    // Verify the terms and conditions validation error message appears
    await expect(page.getByTestId('error-terms'))
        .toHaveText('You must accept the terms.')

})
/**
TC08: Verify success message displays submitted name
1.Navigate to /practice/forms
2.Fill input-first-name with 'Jane'
3.Fill input-last-name with 'Smith'
4.Fill all other required fields with valid data
5.Check checkbox-terms and click submit-form-btn
6.Assert form-success-msg is visible
7.Assert submitted-name text contains 'Jane Smith'
 */
test('TC08: Verify success message displays submitted name', async ({ page }) => {

    // Fill first name
    await page.getByTestId('input-first-name').fill('John')

    // Fill last name
    await page.getByTestId('input-last-name').fill('Doe')

    // Fill email address
    await page.getByTestId('input-email').fill('john@examples.com')

    // Fill phone number
    await page.getByTestId('input-phone').fill('9876543210')

    // Fill date of birth
    await page.getByTestId('input-dob').fill('2000-01-09')

    // Select gender
    await page.getByTestId('radio-gender-male').click()

    // Open country dropdown and select India
    await page.getByTestId('select-country').click()
    await page.getByRole('option', { name: 'India' }).click()

    // Fill city
    await page.getByTestId('input-city').fill('Bangalore')

    // Enter password
    await page.getByTestId('input-password').fill('pass123')

    // Confirm password
    await page.getByTestId('input-confirm-password').fill('pass123')

    // Accept terms and conditions
    await page.getByTestId('checkbox-terms').check()

    // Submit the form
    await page.getByTestId('submit-form-btn').click()

    // Verify submitted name appears in success message
    await expect(page.getByTestId('submitted-name'))
        .toHaveText('John Doe')

})
/**
TC09: Verify reset button clears all fields
1.Navigate to /practice/forms
2.Fill input-first-name with 'John'
3.Fill input-email with 'john@examples.com'
4.Click reset-form-btn
5.Assert input-first-name value is empty
6.Assert input-email value is empty
7.Assert no error messages are visible 
 */

test('TC09: Verify reset button clears all fields', async ({ page }) => {

    // Locate the first name input field
    const name = page.getByTestId('input-first-name')

    // Enter a value into first name field
    await name.fill('John')

    // Locate the email input field
    const email = page.getByTestId('input-email')

    // Enter a value into email field
    await email.fill('john@examples.com')

    // Click the reset button to clear all form fields
    await page.getByTestId('reset-form-btn').click()

    // Verify first name field is cleared
    await expect(name).toHaveValue('')

    // Verify email field is cleared
    await expect(email).toHaveValue('')

})

/**
TC10: Verify gender radio button selection
1.Navigate to /practice/forms
2.Locate gender-group element
3.Click radio-gender-female
4.Assert radio-gender-female is selected (isSelected() / isChecked())
5.Assert radio-gender-male and radio-gender-other are not selected
 */
test('TC10: Verify gender radio button selection', async ({ page }) => {

    // Locate all gender radio buttons
    const female = page.getByTestId('radio-gender-female')
    const male = page.getByTestId('radio-gender-male')
    const other = page.getByTestId('radio-gender-other')

    // Select female gender radio button
    await female.click()

    // Verify female option is selected
    await expect(female).toBeChecked()

    // Verify other options are not selected (radio button exclusivity)
    await expect(male).not.toBeChecked()
    await expect(other).not.toBeChecked()

})
/**
TC11: Verify country dropdown selection
1.Navigate to /practice/forms
2.Locate select-country element
3.Open the dropdown and select 'USA'
4.Assert the displayed value is 'USA'
 */
test('TC11: Verify country dropdown selection', async ({ page }) => {

    // Locate the country dropdown
    const drop = page.getByTestId('select-country')

    // Open the dropdown options
    await drop.click()

    // Select "USA" from the dropdown list
    await page.getByRole('option', { name: 'USA' }).click()

    // Verify the selected value is displayed in the dropdown
    await expect(drop).toHaveText('USA')

})
/**
TC12: Verify multiple interest checkboxes can be selected
1.Navigate to /practice/forms
2.Locate interests-group element
3.Check checkbox-interest-Appium
4.Check checkbox-interest-playwright
5.Assert checkbox-interest-selenium is checked
6.Assert checkbox-interest-playwright is checked
7.Assert both remain checked simultaneously
 */
test('TC12: Verify multiple interest checkboxes can be selected', async ({ page }) => {

    // Locate the "Playwright" interest checkbox
    const checkbox1 = page.getByRole('checkbox', { name: "Playwright" });

    // Locate the "Appium" interest checkbox
    const checkbox2 = page.getByRole('checkbox', { name: "Appium" });

    // Select both checkboxes
    await checkbox1.click();
    await checkbox2.click();

    // Verify both checkboxes are checked (selected)
    await expect(checkbox1).toHaveAttribute('aria-checked', 'true');
    await expect(checkbox2).toHaveAttribute('aria-checked', 'true');

})

/**
TC13: Verify form fields retain values after validation failure
1.Navigate to /practice/forms
2.Fill input-first-name with 'John'
3.Fill input-email with 'john@examples.com'
4.Leave required fields empty and click submit-form-btn
5.Assert input-first-name still shows 'John'
6.Assert input-email still shows 'john@examples.com'
 */

test('TC13: Verify form fields retain values after validation failure', async ({ page }) => {

    // Locate first name input field
    const name = page.getByTestId('input-first-name')

    // Enter first name value
    await name.fill('John')

    // Locate email input field
    const email = page.getByTestId('input-email')

    // Enter email value
    await email.fill('john@examples.com')

    // Submit form (intentionally incomplete to trigger validation failure)
    await page.getByTestId('submit-form-btn').click()

    // Small wait to allow validation to process
    await page.waitForTimeout(100)

    // Verify entered values are still retained after validation error
    await expect(name).toHaveValue('John')
    await expect(email).toHaveValue('john@examples.com')

})

/**
TC14: Verify Fill Again button returns to empty form from success state
1.Navigate to /practice/forms
2.Fill and submit the form successfully
3.Assert form-success-msg is visible
4.Click reset-form-btn (Fill Again)
5.Assert user-registration-form is visible again
6.Assert all fields are empty
 */
test('TC14: Verify Fill Again button returns to empty form from success state', async ({ page }) => {

    // Fill all required form fields with valid data
    await page.getByTestId('input-first-name').fill('John');
    await page.getByTestId('input-last-name').fill('Doe');
    await page.getByTestId('input-email').fill('john@example.com');
    await page.getByTestId('input-phone').fill('9876543210');
    await page.getByTestId('input-dob').fill('2000-01-09');
    await page.getByTestId('radio-gender-male').click();
    await page.getByTestId('select-country').click();
    await page.getByRole('option', { name: 'India' }).click();
    await page.getByTestId('input-city').fill('Bangalore');
    await page.getByTestId('input-password').fill('pass123');
    await page.getByTestId('input-confirm-password').fill('pass123');
    await page.getByTestId('checkbox-terms').check();

    // Submit the form
    await page.getByTestId('submit-form-btn').click();

    // Verify success message is displayed after submission
    await expect(page.getByText(/submitted successfully/i)).toBeVisible();

    // Click reset / fill again button to clear the form
    await page.getByTestId('reset-form-btn').click();

    // Verify form container is still visible after reset
    await expect(page.getByTestId('user-registration-form')).toBeVisible();

    // Verify all input fields are cleared
    await expect(page.getByTestId('input-first-name')).toHaveValue('');
    await expect(page.getByTestId('input-last-name')).toHaveValue('');
    await expect(page.getByTestId('input-email')).toHaveValue('');
    await expect(page.getByTestId('input-phone')).toHaveValue('');
    await expect(page.getByTestId('input-dob')).toHaveValue('');
    await expect(page.getByTestId('input-city')).toHaveValue('');
    await expect(page.getByTestId('input-password')).toHaveValue('');
    await expect(page.getByTestId('input-confirm-password')).toHaveValue('');

    // Verify radio button and checkbox are reset
    await expect(page.getByTestId('radio-gender-male')).not.toBeChecked();
    await expect(page.getByTestId('checkbox-terms')).not.toBeChecked();

    // Verify dropdown reset state (default placeholder text)
    await expect(page.getByTestId('select-country'))
        .toContainText('Select country');

})
/**
TC15: Verify form page loads without errors
1.Navigate to /practice/forms
2.Assert the page loads with HTTP 200 status
3.Assert no JS console errors are present
4.Assert user-registration-form is visible in the DOM
5.Assert submit-form-btn and reset-form-btn are visible
 */

test('TC15: Verify form page loads without errors', async ({ page }) => {

    // Array to capture any runtime JavaScript errors on the page
    const errors: string[] = []

    // Listen for page-level JavaScript errors
    page.on('pageerror', err => {
        errors.push(`Runtime error:${err.message}`)
    })

    // Navigate to the forms page
    const response = await page.goto('https://www.qaplayground.com/practice/forms')

    // Verify page loaded successfully
    expect(response?.status()).toBe(200)

    // Ensure no runtime JavaScript errors occurred
    expect(errors.length).toBe(0)

    // Verify main form is visible
    await expect(page.getByTestId('user-registration-form')).toBeVisible()

    // Verify submit button is visible
    await expect(page.getByTestId('submit-form-btn')).toBeVisible()

    // Verify reset button is visible
    await expect(page.getByTestId('reset-form-btn')).toBeVisible()

})
