import {expect, test} from '@playwright/test'


test.beforeEach(async({page})=>{
 await page.goto('https://www.qaplayground.com/practice/date-picker')

})
/**
TC01: Fill today's date in the date input and verify the value
1.Navigate to /practice/date-picker
2.Locate the today's date input using id='input-today-date' or data-testid='input-today-date'
3.In Selenium: element.sendKeys('2024-03-28') — format must be YYYY-MM-DD for type=date
4.In Playwright: page.fill('#input-today-date', '2024-03-28')
5.Assert getAttribute('value') returns '2024-03-28'
*/

test('TC01: Fill today date in the date input and verify the value', async({page})=>{

   const datelocator=page.getByTestId('input-today-date')
   const todaydate = new Date().toISOString().split('T')[0]
   await datelocator.fill(todaydate)
   await expect(datelocator).toHaveValue(todaydate)
   

})
/**
TC02: Enter a birthday date and assert the value is stored
1.Navigate to /practice/date-picker
2.Locate the birthday input using id='input-birthday' or data-testid='input-birthday'
3.In Selenium: element.sendKeys('1995-06-15')
4.In Playwright: page.fill('#input-birthday', '1995-06-15')
5.Assert the input value attribute equals '1995-06-15'
 */
test('TC02: Enter a birthday date and assert the value is stored', async({page})=>{

   const datelocator=page.getByTestId('input-birthday')
   await datelocator.fill('2000-01-09')
   await expect(datelocator).toHaveValue('2000-01-09')
})

/**
TC03: Fill a date range — start date and end date
1.Navigate to /practice/date-picker
2.Locate start date input using data-testid='input-date-start'
3.Fill with '2024-01-01' using sendKeys (Selenium) or fill() (Playwright)
4.Locate end date input using data-testid='input-date-end'
5.Fill with '2024-01-31' and assert both inputs hold the correct values
 */
test('TC03: Fill a date range — start date and end date', async({page})=>{

   const startdatelocator=page.getByTestId('input-date-start')
   const enddatelocator=page.getByTestId('input-date-end')
   await startdatelocator.fill('2000-01-09')
   await expect(startdatelocator).toHaveValue('2000-01-09')
   await enddatelocator.fill('2100-01-09')
   await expect(enddatelocator).toHaveValue('2100-01-09')

})

/**
TC04: Verify date input rejects out-of-range date (min/max constraint)
1.Navigate to /practice/date-picker
2.Locate the restricted date input using data-testid='input-date-restricted'
3.Attempt to set a date before the min date using sendKeys or fill()
4.In Playwright: await expect(page.locator('#input-date-restricted')).toHaveAttribute('min')
5.Assert the input enforces the min/max boundary — value should clamp or stay invalid
 */
test('TC04: Verify date input rejects out-of-range date (min/max constraint)', async({page})=>{

   const datelocator=page.getByTestId('input-date-restricted')
   await expect(datelocator).toHaveAttribute('min',"2024-01-01")
   await expect(datelocator).toHaveAttribute('max',"2024-12-31")
   await datelocator.fill('2023-01-01')

   //const isValid =await datelocator.evaluate((el)=>(el as HTMLInputElement).checkValidity())
   const isValid = await datelocator.evaluate((el: HTMLInputElement) => el.checkValidity());
   expect(isValid).toBe(false)
})

/**
TC05: Clear a date input and verify it becomes empty
1.Navigate to /practice/date-picker
2.Locate the today's date input using data-testid='input-today-date'
3.Fill it with any valid date first
4.In Selenium: element.clear() — in Playwright: page.fill('#input-today-date', '')
5.Assert getAttribute('value') returns an empty string
 */
test('TC05: Clear a date input and verify it becomes empty)', async({page})=>{

   const datelocator=page.getByTestId('input-today-date')
   const todaydate = new Date().toISOString().split('T')[0]
   await datelocator.fill(todaydate)
   await datelocator.clear()
   await expect(datelocator).toHaveValue('')

})


