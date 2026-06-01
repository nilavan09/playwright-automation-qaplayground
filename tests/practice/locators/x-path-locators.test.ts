/*
========================================
📌 Playwright XPath Locators
Description:
This file demonstrates different XPath strategies
used in Playwright automation testing.

Topics Covered:
- Absolute XPath
- Relative XPath
- XPath functions
- Dynamic XPath
- Locator methods
- Element collections
========================================
*/


/*
====================================================
📌 What is XPath?
====================================================

XPath (XML Path Language) is used to locate
elements inside the DOM.

Playwright supports XPath using:
page.locator("xpath")

Example:
page.locator("//button")

XPath is powerful but should be used carefully.
Prefer Playwright locators like:
- getByRole()
- getByLabel()
when possible.
*/


/*
====================================================
📌 Types of XPath
====================================================

1. Absolute XPath
   - Starts from root HTML element
   - Full DOM path
   - Very fragile

2. Relative XPath
   - Starts from anywhere in DOM
   - More stable
   - Most commonly used
*/


import { test, expect, Locator } from "@playwright/test";


// ====================================================
// Test Case 1 - Absolute XPath
// ====================================================

test("Absolute XPath (Full XPath)", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");


    // ====================================================
    // Absolute XPath
    // ====================================================

    /*
    Absolute XPath:
    - Starts from root element (/html)
    - Contains full DOM hierarchy
    - Breaks easily if UI structure changes

    Usually NOT recommended in real projects.
    */

    const absoluteLogo: Locator = page.locator(
        "//html/body/div[4]/div[1]/div[1]/div[1]/a/img"
    );

    await expect(absoluteLogo).toBeVisible();

    await absoluteLogo.click();

});


// ====================================================
// Test Case 2 - Relative XPath
// ====================================================

test("Relative XPath", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");


    // ====================================================
    // Relative XPath - Logo
    // ====================================================

    /*
    Relative XPath:
    - Starts with //
    - More flexible and maintainable
    - Most preferred XPath strategy
    */

    const relativeLogo: Locator = page.locator(
        "//img[@alt='Tricentis Demo Web Shop']"
    );

    await expect(relativeLogo).toBeVisible();

    await relativeLogo.click();


    // ====================================================
    // Relative XPath - Subscribe Button
    // ====================================================

    /*
    @value accesses attribute value
    */

    const subscribeButton: Locator = page.locator(
        "//input[@value='Subscribe']"
    );

    await expect(subscribeButton).toBeVisible();

    await subscribeButton.click();

});


// ====================================================
// Test Case 3 - XPath Functions
// ====================================================

test("XPath Functions", async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");


    // ====================================================
    // XPath with contains()
    // ====================================================

    /*
    contains():
    Used when attribute value is partially dynamic.

    Example:
    contains(@href,'computer')

    Matches elements where href contains "computer"
    */

    const products: Locator = page.locator(
        "//h2//a[contains(@href,'computer')]"
    );


    // count()
    // Returns number of matched elements

    const productCount: number = await products.count();

    expect(productCount).toBeGreaterThan(0);


    // ====================================================
    // textContent()
    // ====================================================

    /*
    textContent():
    Returns text inside element
    */

    console.log(
        "First item:",
        await products.first().textContent()
    );

    console.log(
        "Last item:",
        await products.last().textContent()
    );

    console.log(
        "Nth item:",
        await products.nth(3).textContent()
    );


    // ====================================================
    // toHaveText()
    // ====================================================

    /*
    Validates text value of element
    Supports regex matching
    */

    await expect(products.first()).toHaveText(/cheap/i);


    // ====================================================
    // allTextContents()
    // ====================================================

    /*
    Returns text from all matched elements
    as array
    */

    const headings: string[] = await products.allTextContents();

    console.log("All headings:", headings);


    // Loop through all headings

    for (const item of headings) {
        console.log(item);
    }


    // ====================================================
    // XPath with starts-with()
    // ====================================================

    /*
    starts-with():
    Matches attribute values starting
    with given text
    */

    const buildProducts: Locator = page.locator(
        "//h2//a[starts-with(@href, '/build')]"
    );

    const buildCount: number = await buildProducts.count();

    expect(buildCount).toBeGreaterThan(0);


    // ====================================================
    // XPath with text()
    // ====================================================

    /*
    text():
    Matches exact visible text
    */

    await page.locator(
        "//li//a[text()='Register']"
    ).click();


    // ====================================================
    // XPath with last()
    // ====================================================

    /*
    last():
    Selects last matching element
    */

    const lastSocialMedia: Locator = page.locator(
        "//div[@class='column follow-us']//li[last()]"
    );

    await expect(lastSocialMedia).toBeVisible();


    // ====================================================
    // XPath with position()
    // ====================================================

    /*
    position():
    Selects element based on index position
    */

    const thirdSocialMedia: Locator = page.locator(
        "//div[@class='column follow-us']//li[position()=3]"
    );

    await expect(thirdSocialMedia).toBeVisible();

});


// ====================================================
// Test Case 4 - Dynamic XPath
// ====================================================

test("Dynamic XPath", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");


    // ====================================================
    // XPath with OR condition
    // ====================================================

    /*
    Dynamic elements:
    Sometimes attributes/text change dynamically.

    Example:
    Button name changes between:
    - start
    - stop

    OR condition handles both cases.
    */

    for (let i = 0; i <= 5; i++) {

        await page.locator(
            "//button[@name='start' or @name='stop']"
        ).click();

    }

});


// ====================================================
// Test Case 5 - Dynamic Element Using Playwright Locator
// ====================================================

test("Dynamic Element Test", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");


    /*
    Using Playwright locator instead of XPath.

    Regex:
    /START|STOP/

    Matches:
    - START
    - STOP
    */

    for (let i = 0; i <= 5; i++) {

        const button: Locator = page.getByRole(
            "button",
            { name: /START|STOP/ }
        );

        await button.click();

    }

});


/*
====================================================
📌 Important XPath Functions
====================================================

1. contains()
   → partial matching

2. starts-with()
   → checks starting value

3. text()
   → exact visible text

4. last()
   → selects last element

5. position()
   → selects element by index
*/


/*
====================================================
📌 Important Locator Methods
====================================================

1. count()
   → returns total matched elements

2. first()
   → selects first element

3. last()
   → selects last element

4. nth(index)
   → selects element by index

5. textContent()
   → returns element text

6. allTextContents()
   → returns text from all matched elements
*/


/*
====================================================
📌 Real Project Insight
====================================================

1. Avoid Absolute XPath in real projects.
   Small UI changes can break tests.

2. Prefer:
   - getByRole()
   - getByLabel()
   - getByTestId()

3. XPath is useful when:
   - dealing with complex DOM structures
   - dynamic elements
   - no stable attributes available

4. Overly complex XPath can make
   tests hard to maintain.

5. Playwright locators are usually
   more stable than XPath.
*/