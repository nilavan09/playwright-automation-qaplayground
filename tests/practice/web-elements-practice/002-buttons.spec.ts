import { errors, expect, test } from '@playwright/test'
import { text } from 'node:stream/consumers'



test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.com/practice/buttons')

})

/**
TC01: Verify button is clickable and triggers action
1.Navigate to /practice/buttons
2.Locate the primary button using data-testid or id
3.Click the button using click() or locator.click()
4.Assert the expected action or message appears after click
 */

test('TC01: Verify button is clickable and triggers action', async ({ page }) => {


    const button = page.locator('button[data-testid=btn-goto-home]')
    await Promise.all([
        page.waitForURL('https://qaplayground.com/'), 
        button.click()
    ])
    await expect(page).toHaveURL('https://qaplayground.com/')
    await expect(page.getByAltText('QA PlayGround')).toBeVisible()
})

/**
TC02: Verify button displays the correct label text
1.Navigate to /practice/buttons
2.Locate the button element
3.Read the button text using getText() or textContent()
4.Assert the text matches the expected label
 */

test('TC02: Verify button displays the correct label text', async ({ page }) => {


    const button = page.locator('button[data-testid=btn-goto-home]')
    const label = page.getByRole('button', { name: 'Go To Home' })
    expect(await label.textContent()).toEqual('Go To Home')
    await expect(button).toHaveText('Go To Home')

})

/**
TC03: Verify button triggers the correct action on click
1.Navigate to /practice/buttons
2.Identify the expected result of clicking the button
3.Click the button
4.Assert the resulting state or message matches expectation
 */

test('TC03: Verify button triggers the correct action on click', async ({ page }) => {


    const button = page.locator('button[data-testid=btn-goto-home]')
    await button.click()
    await expect(page).toHaveURL('https://qaplayground.com/')
    await expect(page.getByAltText('QA PlayGround')).toBeVisible()

})

/**
 TC04: Verify double-click button triggers double-click action
1.Navigate to /practice/buttons
2.Locate the double-click button using data-testid
3.Perform a double-click using doubleClick() or dblclick()
4.Assert the double-click message or state change appears
 */
test('TC04: Verify double-click button triggers double-click action', async ({ page }) => {


    const button = page.getByRole('button', { name: "Double Click Me" })
    await button.dblclick()
    await page.waitForTimeout(500)
    await expect(button).toHaveText('Double Click Me')

})

/**
TC05: Verify right-click button triggers context menu action
1.Navigate to /practice/buttons
2.Locate the right-click button using data-testid
3.Perform a right-click using contextClick() or click({button:'right'})
4.Assert the right-click feedback message appears
 */
test('TC05: Verify right-click button triggers context menu action', async ({ page }) => {


    const button = page.getByRole('button', { name: "Right Click Me" })
    await button.click({ button: 'right' })

    const message = page.locator('p[data-testid="btn-action-result"]')
    await expect(message).toContainText('You Right-clicked on button!')

})

/**
TC06: Verify disabled button cannot be clicked
1.Navigate to /practice/buttons
2.Locate the disabled button
3.Assert isEnabled() returns false (Selenium) or toBeDisabled() passes (Playwright)
4.Attempt to click the button
5.Assert no action is triggered
 */
test('TC06: Verify disabled button cannot be clicked', async ({ page }) => {


    const button = page.locator("button[data-testid='btn-disabled']")
    await expect(button).toBeDisabled()
    await expect(button).toHaveAttribute('disabled', '')

})
/**
TC07: Verify button is enabled when it should be
1.Navigate to /practice/buttons
2.Locate an active button
3.Assert isEnabled() returns true
4.Assert the button does not have the disabled attribute
 */
test('TC07: Verify button is enabled when it should be', async ({ page }) => {


    const button = page.locator("button[id='btn-goto-home']")
    await expect(button).toBeEnabled()
    await expect(button).not.toHaveAttribute('disabled', '')

})
/**
TC08: Verify button is responsive on different screen sizes
1.Navigate to /practice/buttons
2.Resize the browser to mobile viewport (375px)
3.Assert the button is fully visible and not cut off
4.Assert the button is still clickable at mobile size
 */
test('TC08: Verify button is responsive on different screen sizes', async ({ page }) => {


    await page.setViewportSize({ width: 375, height: 667 })
    //await page.goto('https://www.qaplayground.com/practice/buttons')

    const button = page.locator('button[data-testid=btn-goto-home]')
    //await button.waitFor({state:'visible'})
    await expect(button).toBeVisible()
    await expect(button).toBeInViewport()
    await button.click()
    await expect(page).toHaveURL('https://www.qaplayground.com/')
})

/**
TC09: Verify button is accessible via keyboard
1.Navigate to /practice/buttons
2.Tab to the button element
3.Press Enter or Space to activate the button
4.Assert the button action fires correctly
 */
test('TC09: Verify button is accessible via keyboard', async ({ page }) => {




    const button = page.locator('button[data-testid=btn-goto-home]')
    await button.focus()
    await Promise.all([
        page.waitForURL('https://www.qaplayground.com/'),
        page.keyboard.press('Enter')
    ])
    await expect(page.getByAltText('QA PlayGround')).toBeVisible()

})
/**
TC10: Verify button is accessible to screen readers
1.Navigate to /practice/buttons
2.Assert each button has a text label or aria-label
3.Assert role='button' is present or the element is a native button
 */

test('TC10: Verify button is accessible to screen readers', async ({ page }) => {



    const buttons = page.locator('.p-6').locator('button, [role="button"]')

    let buttonvalues = [
        'Go To Home',
        'Find Location',
        'Find my color?',
        'Do you know my size?',
        'Disabled',
        'Click and Hold!',
        'Double Click Me',
        'Right Click Me'
    ]
    //method 1
    for (let i = 0; i < buttonvalues.length; i++) {
        await expect(buttons.nth(i)).toHaveText(buttonvalues[i])
    }
    //method 2
    for (const [index, value] of buttonvalues.entries()) {
        await expect(buttons.nth(index)).toHaveText(value);
    }
})

/**
TC11: Verify button hover state is visually distinct
1.Navigate to /practice/buttons
2.Hover over the button using Actions.moveToElement() or locator.hover()
3.Assert the button CSS changes (e.g. background color or shadow)
 */

test('TC11: Verify button hover state is visually distinct', async ({ page }) => {

    const button = page.locator('[data-testid=btn-goto-home]')
    await button.hover()
    const rgb = await button.evaluate(color => getComputedStyle(color).backgroundColor)
    expect(rgb).toMatch(/239,\s*68,\s*68/)


})

/**
TC12: Verify button state resets after page refresh
1.Navigate to /practice/buttons
2.Click a button that changes state
3.Refresh the page
4.Assert the button returns to its default state
 */

test('TC12: Verify button state resets after page refresh', async ({ page }) => {

    const button = page.locator('[data-testid=btn-click-hold]')
    await button.click({ delay: 1600 })
    await expect(button).toHaveText('Hold Complete!')
    await page.reload({ waitUntil: 'networkidle' })
    await expect(button).toHaveText('Click and Hold!')

})
/**
TC13: Verify button does not overlap other page elements
1.Navigate to /practice/buttons
2.Assert each button bounding box does not intersect with adjacent elements
 */


test('TC13: Verify button does not overlap other page elements', async ({ page }) => {

    await page.goto('https://www.qaplayground.com/practice/buttons');

    const buttons = page.locator('.p-6').getByRole('button');
    const count = await buttons.count();

    console.log(`Total buttons: ${count}`);

    const boxes = [];

    // STEP 1: Collect bounding boxes
    for (let i = 0; i < count; i++) {

        const btn = buttons.nth(i)

        await expect(btn).toBeVisible()

        const box = await btn.boundingBox()

        if (!box) continue;

        boxes.push(box);
    }

    // STEP 2: Compare ADJACENT boxes only
    for (let i = 0; i < boxes.length - 1; i++) {

        const box1 = boxes[i];
        const box2 = boxes[i + 1]

        // const isSeperated = (
        //     box1.x + box1.width < box2.x ||
        //     box2.x + box2.width < box1.x ||
        //     box1.y + box1.height < box2.y ||
        //     box2.y + box2.height < box1.y
        // );

        // visually in site buttons are in vertical so comaring y is enough. 
        const isSeperated = ( box1.y + box1.height < box2.y ||box2.y + box2.height < box1.y); 
        console.log(isSeperated)
        expect(isSeperated).toBeTruthy();
    }
});                                     

/**
TC14: Verify button styling matches design specification
1.Navigate to /practice/buttons
2.Assert the button background color matches the expected value
3.Assert the button font size and weight are correct
4.Assert border-radius and padding match the design 
 */
test('TC14: Verify button styling matches design specification', async ({ page }) => {

    const button = page.getByRole('button',{name:'Go To Home'})
    expect(button).toHaveCSS('background-color', 'rgb(239, 68, 68)')
    //const fontsize =await button.evaluate(size => getComputedStyle(size).fontSize)
    //const radius =await button.evaluate(radius => getComputedStyle(radius).borderRadius)
    
    
    await expect(button).toHaveCSS('font-size', '14px')
    await expect(button).toHaveCSS('font-weight','500')
    await expect(button).toHaveCSS('border-radius','6px')
    await expect(button).toHaveCSS('padding-bottom','8px')
    await expect(button).toHaveCSS('padding-left','16px')

})

/**
TC15: Verify button page loads without errors
1.Navigate to /practice/buttons
2.Assert the page loads successfully (HTTP 200)
3.Assert no JS console errors are present
4.Assert all buttons are visible in the DOM
 */

test('TC15: Verify button page loads without errors', async ({ page }) => {

   const response =await page.goto('https://www.qaplayground.com/practice/buttons')
   expect(response?.status()).toBe(200)
   
   const errors: string[] = [];

    page.on('pageerror', err => {
        errors.push(err.message);
    });

    await page.goto('https://www.qaplayground.com/practice/buttons');

    expect(errors.length).toBe(0);
    //console.log(errors)

    const buttons=await page.locator('.p-6').getByRole('button')
    const count=await buttons.count()
    for(let i=0; i< count; i++){
        await expect(buttons.nth(i)).toBeVisible()
    }
    

});
/**
 Reference : Capture console+runtime error
 */

test(' JS errors (runtime)', async ({ page }) => {

    const errors: string[] = [];

    page.on('pageerror', err => {
        errors.push(`runtime: ${err.message}`);
    });
    

    await page.goto('https://the-internet.herokuapp.com/javascript_error');

    expect(errors.length).toBe(1);
});

test(' JS errocrs (console)', async ({ page }) => {

   const  erors:string[]=[]
   page.on('console',con=>{
    erors.push(con.text())
   })
   await page.goto('https://www.qaplayground.com/practice/buttons')
   
   await page.evaluate(() => {
    console.error("testing")
   })
    await page.waitForTimeout(500);
   expect(erors).toContain('testing')
});

