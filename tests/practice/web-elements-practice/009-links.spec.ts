import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice/links')

})

/**
TC01: Verify link navigates to the correct URL on click
1.Navigate to /practice/links
2.Locate a link element using its text or data-testid
3.Click the link
4.Assert the current URL matches the expected destination
 */

test('TC01: Verify link navigates to the correct URL on click', async ({ page }) => {
 
    const link = page.getByTestId('link-internal-home')
    await link.click()
    await expect(page).toHaveURL('https://www.qaplayground.com/')
})

/**
TC02: Verify link text matches expected label
1.Navigate to /practice/links
2.Locate the link element
3.Read link text using getText() or textContent()
4.Assert the text equals the expected value
 */

test('TC02: Verify link text matches expected label', async ({ page }) => {
 
    const link = page.getByTestId('link-internal-home')
    const linkvalue = await link.textContent()
    console.log(linkvalue)
    expect(linkvalue).toBe('Home')
})

/**
TC03: Verify external link opens in a new tab
1.Navigate to /practice/links
2.Locate an external link (target='_blank')
3.Assert the link has target='_blank' and rel='noopener noreferrer'
4.Click the link and switch to the new window handle
5.Assert the new tab URL matches the expected external URL
 */
test('TC03: Verify external link opens in a new tab', async ({ page,context }) => {
 
    const link = page.getByTestId('link-image-ironman')
    await expect(link).toHaveAttribute('target','_blank')
    await expect(link).toHaveAttribute('rel','noopener noreferrer')
    const [newpage]=await Promise.all([
        context.waitForEvent('page'),
        await link.click()

    ])
    await newpage.waitForLoadState('networkidle')

    await expect(newpage).toHaveTitle('You searched for iron man - ASHISH EDITZ')
})
/**
TC04: Verify internal link stays in the same tab
1.Navigate to /practice/links
2.Locate an internal link (no target='_blank')
3.Record the current window handle count
4.Click the link
5.Assert no new window or tab was opened
6.Assert the browser URL changed to the expected internal path
 */

test('TC04: Verify internal link stays in the same tab', async ({ page,context }) => {
 
    const link = page.getByTestId('link-internal-about')
    const pagesbefore=context.pages().length
    // console.log(pagesbefore)
    await link.click()
    const pagesafter=context.pages().length
    expect(pagesbefore).toBe(pagesafter)
    await expect(page).toHaveURL('https://www.qaplayground.com/about-us')
})

/**
TC05: Verify broken link returns HTTP error status
1.Navigate to /practice/links
2.Locate a link marked as broken or invalid
3.Send an HTTP GET request to the link's href
4.Assert the response status is 404 or another error code
 */
test('TC05: Verify broken link returns HTTP error status', async ({ page }) => {
 
    const link = page.getByTestId('link-broken-same')
  
    const href= await link.getAttribute('href')
    
    const response =await page.request.get(href!)
    expect(response.status()).toBe(500)
})

/**
TC06: Verify link is keyboard accessible
1.Navigate to /practice/links
2.Tab to the link element
3.Assert the link receives focus and a visible focus ring appears
4.Press Enter to activate the link
5.Assert navigation occurs as expected 
 */
test('TC06: Verify link is keyboard accessible', async ({ page }) => {
    const link = page.getByTestId('link-internal-home')
    await page.reload()
    
    for(let i=0;i<20;i++) {
    await page.keyboard.press('Tab')
    const isfocused = await link.evaluate(element=>document.activeElement==element)
   
    if (isfocused) break

    }
    
    await expect(link).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('https://www.qaplayground.com/')
    
})
/**
TC07: Verify link href attribute contains the correct URL
1.Navigate to /practice/links
2.Locate the link element
3.Read the href attribute using getAttribute('href')
4.Assert the value matches the expected URL or path
 */
test('TC07: Verify link href attribute contains the correct URL', async ({ page }) => {
    
    const link = page.getByTestId('link-broken-same')
  
    const href= await link.getAttribute('href')
    
    expect(href).toBe('https://the-internet.herokuapp.com/status_codes/500')
    
})

/**
TC08: Verify link has accessible label for screen readers
1.Navigate to /practice/links
2.Locate each link element
3.Assert each link has descriptive text or an aria-label
4.Assert no link text is ambiguous (e.g. 'click here', 'read more' alone) 
 */
test('TC08: Verify link has accessible label for screen readers', async ({ page }) => {
    
    const link = page.locator('.p-6').getByRole('link')
    const count = await link.count()


    const ambiguouswords=[
        'click here',
        'read more',
        'know more'
    ]
    
    for(let i=0; i<count ; i++){
        const text =(await link.nth(i).textContent())?.trim().toLowerCase() || ''

        //expect(text).toBeTruthy()
        console.log(text)
        expect(ambiguouswords).not.toContain(text)
    }
    
})

/**
TC09: Verify link hover state is visually distinct
1.Navigate to /practice/links
2.Hover over a link
3.Assert an underline or color change appears on hover
 */
test('TC09: Verify link hover state is visually distinct', async ({ page }) => {
    
    const link = page.getByTestId('link-broken-same')

    await link.hover()
    
    await expect(link).toHaveCSS('color','rgb(153, 27, 27)')
    
})

/**
TC10: Verify right-click on link shows browser context menu
1.Navigate to /practice/links
2.Right-click a standard anchor link
3.Assert the browser context menu appears with 'Open in new tab' option
 */

test('TC10: Verify link opens in new tab (context menu behavior simulated)', async ({ page, context }) => {

  const link = page.getByTestId('link-internal-home');

  const href = await link.getAttribute('href');

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    link.click({ modifiers: ['Control'] })
  ]);

  await newPage.bringToFront()
  await newPage.waitForLoadState('networkidle');
  await page.waitForTimeout(300)
  expect(newPage.url()).toContain(href!);
});
/**
TC11: Verify link page loads without console errors
1.Navigate to /practice/links
2.Assert the page loads with HTTP 200
3.Assert no JS console errors are present
4.Assert all link elements are visible and clickable
 */

test('TC11: Verify link page loads without console errors', async ({ page }) => {
 
const response =await page.goto('https://www.qaplayground.com/practice/links')
expect(response?.status()).toBe(200)

const errorslist:string[]=[]
page.on('pageerror',pe=>{
    errorslist.push(pe.message)
})
expect(errorslist.length).toBe(0)

const links=[
    'link-internal-home',
    'link-internal-about',
    'link-external-selenium',
    'link-external-course',
    'link-broken-newtab',
    'link-broken-same',
    'link-broken-empty',
    'link-image-broken',
    'link-image-ironman',
    'link-btn-broken',
    'link-btn-broken-2',
    'link-btn-home',
    'link-text-garbled-1',
    'link-text-garbled-2',
    'link-text-long',
    'link-text-anchor'
]

for(let link of links){
    await expect(page.getByTestId(link)).toBeVisible()
}

})