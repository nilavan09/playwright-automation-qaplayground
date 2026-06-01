/*
========================================
📌 CSS Selectors in Playwright
Description:
This file demonstrates different CSS selector
strategies used in Playwright automation.

Topics Covered:
- CSS Selectors
- ID selectors
- Class selectors
- Attribute selectors
- Combined selectors
========================================
*/


/*
====================================================
📌 What is CSS?
====================================================

CSS (Cascading Style Sheets) is used to style
HTML elements in a webpage.

A website is mainly built using:
- HTML → structure
- CSS → styling
- JavaScript → functionality
*/


/*
====================================================
📌 What are CSS Selectors?
====================================================

CSS Selectors are patterns used to locate
HTML elements.

Playwright supports CSS selectors using:

page.locator("css-selector")

Example:
page.locator("input.search-box")
*/


/*
====================================================
📌 Types of CSS Locators
====================================================

1. Absolute CSS Locator
   - Full hierarchy path
   - Rarely used
   - Fragile

2. Relative CSS Locator
   - Flexible and readable
   - Commonly used
*/


/*
====================================================
📌 Common CSS Selector Syntax
====================================================

1. tag with id
   tag#id
   #id

2. tag with class
   tag.class
   .class

3. tag with attribute
   tag[attribute='value']
   [attribute='value']

4. tag with class and attribute
   tag.class[attribute='value']
   .class[attribute='value']
*/


import { test, expect, Locator } from "@playwright/test";


// ====================================================
// Test Case - CSS Selectors
// ====================================================

test("CSS Selectors Test", async ({ page }) => {

    await page.goto(
        "https://demowebshop.tricentis.com/"
    );

    await expect(page).toHaveURL(
        "https://demowebshop.tricentis.com/"
    );


    // ====================================================
    // 1. tag#id
    // ====================================================

    /*
    Syntax:
    tag#id

    OR

    #id

    Used when element has unique ID.
    IDs should be unique in webpage.
    */

    const searchBox: Locator = page.locator(
        "input#small-searchterms"
    );

    await searchBox.fill("test");


    // Short version using only ID

    await page.locator(
        "#small-searchterms"
    ).fill("test1");


    // ====================================================
    // 2. tag.class
    // ====================================================

    /*
    Syntax:
    tag.class

    OR

    .class

    Used when element contains class attribute.
    */

    const classSelector: Locator = page.locator(
        "input.search-box-text"
    );

    await classSelector.fill("search");


    // Short version using only class

    await page.locator(
        ".search-box-text"
    ).fill("demo");


    // ====================================================
    // 3. tag[attribute='value']
    // ====================================================

    /*
    Syntax:
    tag[attribute='value']

    OR

    [attribute='value']

    Used when locating element
    using custom attributes.
    */

    const attributeSelector: Locator = page.locator(
        "input[name='q']"
    );

    await attributeSelector.fill(
        "attribute selector"
    );


    // Short version using attribute only

    await page.locator(
        "[name='q']"
    ).fill("Playwright");


    // ====================================================
    // 4. tag.class[attribute='value']
    // ====================================================

    /*
    Combines:
    - tag
    - class
    - attribute

    More specific and stable locator.
    */

    const combinedSelector: Locator = page.locator(
        "input.search-box-text[name='q']"
    );

    await combinedSelector.fill("combined");


    // Short combined version

    await page.locator(
        ".search-box-text[name='q']"
    ).fill("pozhil");

});


/*
====================================================
📌 Important CSS Selector Notes
====================================================

1. # represents ID
   Example:
   #login

2. . represents class
   Example:
   .button

3. [] represents attribute
   Example:
   [type='text']

4. CSS selectors are generally:
   - faster
   - cleaner
   - easier to read
   compared to XPath
*/


/*
====================================================
📌 CSS vs XPath
====================================================

CSS:
✔ faster
✔ cleaner
✔ easier syntax
✔ preferred for simple elements

XPath:
✔ powerful navigation
✔ supports parent traversal
✔ useful for complex structures

CSS cannot move upward in DOM.
XPath can navigate:
- parent
- ancestor
- siblings
*/


/*
====================================================
📌 Real Project Insight
====================================================

1. Prefer:
   - getByRole()
   - getByLabel()
   over raw CSS when possible.

2. CSS selectors are commonly used for:
   - stable UI elements
   - forms
   - buttons
   - inputs

3. Avoid overly long selectors.
   Long locators become difficult to maintain.

4. IDs are usually the most stable
   CSS selectors.

5. Combining class + attribute
   improves locator reliability.
*/