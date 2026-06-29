import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice/multi-select')

})

/**
TC01: Select multiple fruits using Ctrl+click in a native multi-select
1.Navigate to /practice/multi-select
2.Locate the fruit multi-select using id='fruitMultiSelect' or data-testid='fruit-multi-select'
3.In Selenium: Select select = new Select(element); select.selectByVisibleText('Apple'); new Actions(driver).keyDown(Keys.CONTROL).click(driver.findElement(By.cssSelector('option[value="banana"]'))).keyUp(Keys.CONTROL).perform()
4.In Playwright: page.selectOption('#fruitMultiSelect', ['apple', 'banana', 'grapes'])
5.Assert data-testid='fruit-selected-output' text contains 'apple' and 'banana'
 */

test('TC01: Verify multiple fruits can be selected from the dropdown', async ({ page }) => {

    // Locate the multi-select dropdown using its test ID
    const fruit = page.getByTestId('fruit-multi-select');

    // Select multiple options from the dropdown
    await fruit.selectOption(['Apple', 'Banana', 'Mango']);

    // Expected values displayed by the application (formatted in lowercase)
    const fruits = ['apple', 'banana', 'mango'];

    // Verify that the selected fruits are displayed correctly in the output
    await expect(page.getByTestId('fruit-selected-output'))
        .toContainText(`Selected: ${fruits.join(', ')}`);
});

/**
TC02: Deselect a specific option from a pre-selected multi-select
1.Navigate to /practice/multi-select
2.Locate the skills multi-select using data-testid='skills-multi-select'
3.Assert 'playwright' is pre-selected using getAllSelectedOptions()
4.In Selenium: Select.deselectByVisibleText('Playwright')
5.In Playwright: select only the remaining options — page.selectOption('#skillsMultiSelect', ['selenium', 'cypress'])
6.Assert data-testid='skills-selected-output' no longer contains 'playwright'
 */

test('TC02: Deselect a specific option from a pre-selected multi-select', async ({ page }) => {

    // Locate the skills multi-select dropdown
    const skills = page.getByTestId('skills-multi-select')

    // const selectedValues = await skills.evaluate(el=>{
    //     const values = el as HTMLSelectElement
    //     return Array.from(values.selectedOptions).map(option=>option.value)
    // }
    // )
    //console.log(selectedValues)

    // Retrieve all currently selected options and convert them to lowercase
    // for a consistent comparison.
    const value = await skills.evaluate((select: HTMLSelectElement) => {
        return Array.from(select.selectedOptions).map(o => o.value.toLowerCase())
    })

    // Print the selected values for debugging
    console.log(value)

    // Verify the default selected options are Selenium, Playwright, and Cypress
    expect(value).toEqual(['selenium', 'playwright', 'cypress']);

    // Select Appium, which replaces the existing selected options
    await skills.selectOption('Appium')

    // Verify that Playwright is no longer displayed in the selected output
    await expect(page.getByTestId('skills-selected-output')).not.toContainText('Selected: playwright')

})

/**
TC03: Select all countries using the Select All button
1.Navigate to /practice/multi-select
2.Locate the 'Select All' button using data-testid='select-all-btn' and click it
3.Assert data-testid='country-count' text equals '6'
4.Click data-testid='deselect-all-btn'
5.Assert data-testid='country-count' text equals '0'
 */
test('TC03: Select all countries using the Select All button', async ({ page }) => {

    // Locate the Select All and Deselect All buttons
    const selectbutton = page.getByTestId('select-all-btn')
    const deselectbutton = page.getByTestId('deselect-all-btn')

    // Click the Select All button to select all available countries
    await selectbutton.click()

    // Verify that all 6 countries are selected
    await expect(page.getByTestId('country-count')).toHaveText("6")

    // Click the Deselect All button to clear all selected countries
    await deselectbutton.click()

    // Verify that no countries remain selected
    await expect(page.getByTestId('country-count')).toHaveText("0")

})

/**
TC04: Check multiple checkboxes and verify selected output
1.Navigate to /practice/multi-select
2.Locate checkboxes in data-testid='tech-checkbox-group'
3.Click data-testid='tech-checkbox-react' and data-testid='tech-checkbox-nextjs'
4.In Selenium: assert both checkboxes return isSelected() == true
5.In Playwright: await expect(page.locator('[data-testid="tech-checkbox-react"]')).toBeChecked()
6.Assert data-testid='tech-selected-output' contains 'react' and 'nextjs'
 */

test('TC04: Check multiple checkboxes and verify selected output', async ({ page }) => {

    // Locate the React checkbox
    const chekboxgroup = page.getByTestId('tech-checkbox-react')

    // Select the React checkbox
    await chekboxgroup.click()

    // Verify that the selected output displays "React"
    await expect(page.getByTestId('tech-selected-output')).toHaveText('Selected: react')
})
/**
TC05: Add a tag and then remove it from the chip-based multi-select
1.Navigate to /practice/multi-select
2.Click data-testid='tag-option-selenium' to add the tag
3.Assert data-testid='tag-badge-selenium' is visible in the selected area
4.Assert data-testid='tag-count' text equals '1'
5.Click data-testid='remove-tag-selenium' to remove the tag
6.Assert data-testid='tag-count' text equals '0'
 */
test('TC05: Add a tag and then remove it from the chip-based multi-select', async ({ page }) => {

    // Locate the Playwright tag option
    const tag = page.getByTestId('tag-option-playwright')

    // Click the tag to add it to the selection
    await tag.click()

    // Verify that one tag has been selected
    await expect(page.getByTestId('tag-count')).toHaveText('1')

    // Click the same tag again to remove it from the selection
    await tag.click()

    // Verify that no tags remain selected
    await expect(page.getByTestId('tag-count')).toHaveText('0')
})
