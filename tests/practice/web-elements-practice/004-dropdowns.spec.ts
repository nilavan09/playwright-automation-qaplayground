import {expect, test} from '@playwright/test'


test.beforeEach(async({page})=>{
 await page.goto('https://www.qaplayground.com/practice/dropdowns')

})
/**
TC01: Select 'Apple' from fruit dropdown by visible text
1.Navigate to /practice/dropdowns
2.Locate the fruit dropdown using id='dropdown-fruit' or data-testid='dropdown-fruit'
3.In Selenium: wrap with Select class → selectByVisibleText('Apple')
4.In Playwright: use page.selectOption('#dropdown-fruit', { label: 'Apple' })
5.Assert the dropdown now shows 'Apple' as the selected value
*/

test("TC01: Select 'Apple' from fruit dropdown by visible text", async({page})=>{

const fruitdrop= page.getByTestId('dropdown-fruit')
await fruitdrop.click()
await page.getByRole('option',{name:"Apple"}).click()
await expect(fruitdrop).toHaveText('Apple')

})

/**
TC02: Select 'India' from country dropdown by value attribute
1.Navigate to /practice/dropdowns
2.Locate the country dropdown using id='dropdown-country' or data-testid='dropdown-country'
3.In Selenium: wrap with Select class → selectByValue('india')
4.In Playwright: use page.selectOption('#dropdown-country', 'india')
5.Assert the selected option text is 'India'
 */

test("TC02: Select 'India' from country dropdown by value attribute", async({page})=>{

const countrydrop= page.getByTestId('dropdown-country')
await countrydrop.click()
await page.getByRole('option',{name:"India"}).click()
await expect(countrydrop).toContainText('India')

})

/**
TC03: Verify selected value is displayed after selection
1.Navigate to /practice/dropdowns
2.Select 'Banana' from the fruit dropdown
3.Locate the result display element below the dropdown (data-testid='result-fruit')
4.Assert the result element text contains 'Banana'
 */

test("TC03: Verify selected value is displayed after selection", async({page})=>{

const fruitdrop= page.getByTestId('dropdown-fruit')
await fruitdrop.click()
await page.getByRole('option',{name:"Banana"}).click()
await expect(fruitdrop).toContainText('Banana')
await expect(page.getByTestId('result-fruit')).toHaveText(/Selected: banana/)

})

/**
TC04: Get all available options from the programming language dropdown
1.Navigate to /practice/dropdowns
2.Locate the language dropdown using data-testid='dropdown-language'
3.In Selenium: Select.getOptions() — assert size is 3   
4.In Playwright: page.locator('#dropdown-language option').allInnerTexts()
5.Assert the returned list contains: Python, Java, JavaScript   
 */
test("TC04: Get all available options from the programming language dropdown", async({page})=>{

const language= page.getByTestId('dropdown-language')
await language.click()
// await page.getByRole('option',{name:'Python'}).click()
const optionLocator =await page.getByRole('option').allInnerTexts()
console.log(optionLocator)
expect(optionLocator).toEqual(["Python", "Java", "JavaScript"])

})

/**
TC05: Select the last option from the programming language dropdown
1.Navigate to /practice/dropdowns
2.Locate the language dropdown using data-testid='dropdown-language'
3.In Selenium: get all options with getOptions(); click the last one
4.In Playwright: const opts = await page.locator('#dropdown-language option').all(); await opts[opts.length - 1].click()
5.Assert the last option ('JavaScript') is now selected
 */

test("TC05: Select the last option from the programming language dropdown", async({page})=>{

const language= page.getByTestId('dropdown-language')
await language.click()
await page.getByRole('option').last().click()
await expect(language).toHaveText('JavaScript')
})

/**
TC06: Multi-select: select multiple superheroes using CTRL+click
1.Navigate to /practice/dropdowns
2.Locate the multi-select element using data-testid='dropdown-heroes'
3.In Selenium: Select heroes = new Select(element); heroes.selectByVisibleText('Ant-Man'); heroes.selectByVisibleText('Batman')
4.In Playwright: page.selectOption('#dropdown-heroes', ['ant-man', 'batman'])
5.Assert getAllSelectedOptions() returns 2 items: Ant-Man and Batman
 */
test("TC06: Multi-select: select multiple superheroes using CTRL+click", async({page})=>{

const heroes = page.getByTestId('dropdown-heroes');

  await heroes.selectOption([
    { label: 'Ant-Man' },
    { label: 'Aquaman' },
    { label: 'Batman' }
  ]);

  const selected = await heroes.evaluate((el: HTMLSelectElement) =>
    Array.from(el.selectedOptions).map(o => o.textContent?.trim())
  );

  expect(selected).toEqual(['Ant-Man', 'Aquaman', 'Batman']);

})

/**
TC07: Multi-select: deselect a previously selected option
1.Navigate to /practice/dropdowns
2.Select 'Ant-Man' and 'Aquaman' from the heroes multi-select
3.In Selenium: Select.deselectByVisibleText('Ant-Man')
4.In Playwright: hold Ctrl and click 'Ant-Man' again to deselect, or re-selectOption with only 'aquaman'
5.Assert getAllSelectedOptions() now contains only 'Aquaman'
 */
test("TC07: Multi-select: deselect a previously selected option", async({page})=>{

const heros= page.getByTestId('dropdown-heroes')
await heros.selectOption(['Ant-Man','Aquaman'])
await heros.selectOption(['Aquaman'])

expect(
    await heros.evaluate((el:HTMLSelectElement)=>Array.from(el.selectedOptions).map(o=>o.textContent?.trim()))
).toEqual(['Aquaman'])

})

/**
TC08: Verify default placeholder text before any selection
1.Navigate to /practice/dropdowns
2.Locate the fruit dropdown before interacting with it
3.Assert the trigger/placeholder text reads 'Select Fruit'
4.In Playwright: await expect(page.locator('[data-testid="dropdown-fruit"]')).toHaveText('Select Fruit')
 */
test("TC08: Verify default placeholder text before any selection", async({page})=>{

const fruitdrop= page.getByTestId('dropdown-fruit')
await expect(fruitdrop).toHaveText('Select Fruit')

})
/**
TC09: Verify a dropdown is enabled and interactable
1.Navigate to /practice/dropdowns
2.Locate the country dropdown using data-testid='dropdown-country'
3.In Selenium: assert element.isEnabled() returns true
4.In Playwright: assert await page.isDisabled('[data-testid="dropdown-country"]') returns false
5.Attempt to select an option and assert it succeeds without error
 */
test("TC09: Verify a dropdown is enabled and interactable", async({page})=>{

const countrydrop= page.getByTestId('dropdown-country')
await expect(countrydrop).toBeEnabled()
await countrydrop.click()
await page.getByRole('option',{name:'India'}).click()
await expect(countrydrop).toHaveText('India')

})

/**
TC10: Verify the total count of options in the country dropdown
1.Navigate to /practice/dropdowns
2.Locate the country dropdown using data-testid='dropdown-country'
3.In Selenium: assert Select.getOptions().size() equals 4
4.In Playwright: await expect(page.locator('#dropdown-country option')).toHaveCount(4)
5.Assert all four country names are present: India, USA, UK, Argentina
 */

test("TC10: Verify the total count of options in the country dropdown", async({page})=>{

const countrydrop= page.getByTestId('dropdown-country')
await countrydrop.click()
await expect(page.getByRole('option')).toHaveCount(4)
const valueofdrop=await  page.getByRole('option').allTextContents()
expect(valueofdrop).toEqual(["India", "USA", "UK", "Argentina"])
console.log(valueofdrop)


})
