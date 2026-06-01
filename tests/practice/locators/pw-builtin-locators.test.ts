/*
========================================
📌 Playwright Locators
Description:
This file demonstrates commonly used Playwright
locator strategies for identifying web elements.

Key Concepts:
- Locator
- DOM (Document Object Model)
- Accessibility-based selectors
- Form element selectors
========================================
*/


/*
📌 What is Locator?

Locator identifies elements on a web page
so Playwright can interact with them.

Examples:
- click()
- fill()
- hover()
- validation checks


📌 What is DOM?

DOM (Document Object Model) is the browser's
representation of the webpage structure.

Playwright interacts with elements through DOM.
*/


/*
📌 Why Playwright Locators are Important?

Locators are:
- auto waiting
- retry capable
- more stable
- readable
- recommended over raw XPath/CSS in most cases

Playwright automatically waits for elements
before performing actions.
*/


/*
📌 Recommended Locator Priority

1. getByRole()        → Best practice
2. getByLabel()       → Best for forms
3. getByPlaceholder() → Good for inputs
4. getByText()        → Good for visible text
5. getByTestId()      → Best for stable automation
6. CSS/XPath          → Use only when necessary
*/


/*
📌 Common Playwright Locator Methods

1. page.getByAltText()
   → Locate element using alt attribute

2. page.getByText()
   → Locate element using visible text

3. page.getByRole()
   → Locate element using accessibility role

4. page.getByLabel()
   → Locate form controls using label text

5. page.getByPlaceholder()
   → Locate input using placeholder text

6. page.getByTitle()
   → Locate element using title attribute

7. page.getByTestId()
   → Locate element using data-testid attribute
*/


import { test, expect, Locator } from "@playwright/test";


// ====================================================
// Test Case 1 - Verify Different Locator Strategies
// ====================================================

test("Verify Playwright Locators", async ({ page }) => {

    await page.goto("https://demo.nopcommerce.com/");


    // ====================================================
    // 1. getByAltText()
    // ====================================================

    /*
    Used mainly for:
    - images
    - area elements

    Identifies element using alt attribute
    */

    const logo: Locator = page.getByAltText("nopCommerce demo store");

    await expect(logo).toBeVisible();


    // ====================================================
    // 2. getByText()
    // ====================================================

    /*
    Used for non-interactive elements:
    - div
    - span
    - paragraph
    - headings

    Supports:
    - full text
    - partial text
    - regular expressions
    */

    // Full text match
    await expect(
        page.getByText("Welcome to our store")
    ).toBeVisible();

    // Partial text match
    await expect(
        page.getByText("Welcome to")
    ).toBeVisible();

    // Regex match
    await expect(
        page.getByText(/Welcome\s+To\s+Our\s+Store/i)
    ).toBeVisible();


    // ====================================================
    // 3. getByRole()
    // ====================================================

    /*
    Recommended locator for interactive elements:
    - buttons
    - links
    - checkboxes
    - headings
    - tables

    Based on W3C ARIA accessibility roles
    */

    await page.getByRole("link", { name: "Register" }).click();

    await expect(
        page.getByRole("heading", { name: "Register" })
    ).toBeVisible();

});


// ====================================================
// Test Case 2 - Form and Attribute Based Locators
// ====================================================

test("Verify Playwright Locator Methods", async ({ page }) => {

    await page.goto("http://www.automationpractice.pl/index.php");

    await page.getByRole("link", { name: "Sign in" }).click();


    // ====================================================
    // 4. getByLabel()
    // ====================================================

    /*
    Best for form fields with visible labels
    */

    await page
        .getByLabel("Email address")
        .nth(0)
        .fill("Test");


    // ====================================================
    // 5. getByPlaceholder()
    // ====================================================

    /*
    Used for input fields with placeholder text
    */

    await page
        .getByPlaceholder("Search")
        .fill("BLOG");


    // ====================================================
    // 6. getByTitle()
    // ====================================================

    /*
    Locates element using title attribute
    */

    await page.goto("https://developer.mozilla.org/en-US/");

    await expect(
        page.getByTitle("Search the site").nth(2)
    ).toHaveText("Search");


    // ====================================================
    // 7. getByTestId()
    // ====================================================

    /*
    Uses data-testid attribute.

    Preferred when:
    - text changes frequently
    - UI is dynamic
    - role/text locators are unstable
    */

    // Example:
    // await page.getByTestId("login-button").click();


    // ====================================================
    // iframe Example
    // ====================================================

    /*
    frameLocator() is used to interact with
    elements inside iframe
    */

    // const frame = page.frameLocator(
    //     'iframe[title="fb:like_box Facebook Social Plugin"]'
    // );

    // await frame.locator("button").click();

});


/*
====================================================
📌 Important Notes
====================================================

1. getByRole() is the most recommended locator
   by Playwright team.

2. Prefer accessibility-based locators
   instead of XPath whenever possible.

3. getByText() is good for non-interactive elements.

4. getByLabel() improves readability in form automation.

5. getByTestId() is useful for stable automation
   in large real-world projects.

6. Playwright uses auto waiting internally,
   reducing synchronization issues.

7. Unstable locators are one of the main reasons
   for flaky automation tests.
*/


/*
====================================================
📌 Strict Mode in Playwright
====================================================

Playwright expects locator to match
only ONE element.

If multiple elements match,
Playwright throws strict mode violation.

Example:

page.getByText("Submit")

If multiple "Submit" buttons exist,
use:
- nth()
- first()
- specific locator filtering
*/


/*
====================================================
📌 Real Project Insight
====================================================

In real automation frameworks:

- Choosing correct locators improves:
    ✔ test stability
    ✔ maintainability
    ✔ execution reliability

- Poor locators lead to:
    ❌ flaky tests
    ❌ maintenance issues
    ❌ random failures
*/