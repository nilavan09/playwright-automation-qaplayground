/*
========================================
📌 XPath Axes in Playwright
Description:
This file demonstrates different XPath Axes
used to navigate elements in the DOM.

Topics Covered:
- self
- parent
- child
- ancestor
- descendant
- following
- following-sibling
- preceding
- preceding-sibling
========================================
*/


/*
====================================================
📌 What are XPath Axes?
====================================================

XPath Axes are used to navigate between
related elements in the DOM structure.

They help locate:
- parent elements
- child elements
- siblings
- ancestors
- nearby elements

Very useful when direct attributes
are not available.
*/


import { test, expect, Locator } from "@playwright/test";


// ====================================================
// Test Case - XPath Axes Examples
// ====================================================

test("XPath Axes", async ({ page }) => {

    await page.goto(
        "https://www.w3schools.com/html/html_tables.asp"
    );


    // ====================================================
    // 1. self:: axis
    // ====================================================

    /*
    self::
    Selects the current element itself.

    Here:
    Selects the <td> containing "Germany"
    */

    const germanyCell: Locator = page.locator(
        "//td[text()='Germany']/self::td"
    );

    await expect(germanyCell).toBeVisible();


    // ====================================================
    // 2. parent:: axis
    // ====================================================

    /*
    parent::
    Selects immediate parent element.

    Here:
    Gets the parent <tr> of Germany cell.
    */

    const parentRow: Locator = page.locator(
        "//td[text()='Germany']/parent::tr"
    );

    await expect(parentRow).toHaveText(
        "Alfreds Futterkiste Maria Anders Germany"
    );


    // ====================================================
    // 3. child:: axis
    // ====================================================

    /*
    child::
    Selects direct child elements.

    Here:
    Gets all <td> children from second row.
    */

    const secondRowCells: Locator = page.locator(
        "//table[@id='customers']//tr[2]/child::td"
    );

    await expect(secondRowCells).toHaveCount(3);


    // ====================================================
    // 4. ancestor:: axis
    // ====================================================

    /*
    ancestor::
    Selects parent, grandparent,
    or higher-level ancestor elements.

    Here:
    Gets ancestor <table>
    of Germany cell.
    */

    const customerTable: Locator = page.locator(
        "//td[text()='Germany']/ancestor::table"
    );

    await expect(customerTable).toHaveAttribute(
        "id",
        "customers"
    );


    // ====================================================
    // 5. descendant:: axis
    // ====================================================

    /*
    descendant::
    Selects all nested child elements.

    Here:
    Gets all <td> elements
    inside table.
    */

    const allTableCells: Locator = page.locator(
        "//table[@id='customers']/descendant::td"
    );

    await expect(allTableCells).toHaveCount(18);


    // ====================================================
    // 6. following:: axis
    // ====================================================

    /*
    following::
    Selects elements appearing after
    current element in document order.

    Here:
    Gets first <td> after Germany cell.
    */

    const followingCell: Locator = page.locator(
        "//td[normalize-space()='Germany']/following::td[1]"
    );

    await expect(followingCell).toHaveText(
        "Centro comercial Moctezuma"
    );


    // ====================================================
    // 7. following-sibling:: axis
    // ====================================================

    /*
    following-sibling::
    Selects sibling elements to the right.

    Here:
    Gets <td> after "Maria Anders"
    in same row.
    */

    const followingSibling: Locator = page.locator(
        "//td[normalize-space()='Maria Anders']/following-sibling::td"
    );

    await expect(followingSibling).toHaveCount(1);


    // ====================================================
    // 8. preceding:: axis
    // ====================================================

    /*
    preceding::
    Selects elements appearing before
    current element in document order.

    Here:
    Gets <td> before Germany cell.
    */

    const precedingCell: Locator = page.locator(
        "//td[text()='Germany']/preceding::td[1]"
    );

    await expect(precedingCell).toHaveText(
        "Maria Anders"
    );


    // ====================================================
    // 9. preceding-sibling:: axis
    // ====================================================

    /*
    preceding-sibling::
    Selects sibling elements to the left.

    Here:
    Gets all <td> elements
    before Germany cell.
    */

    const leftSiblings: Locator = page.locator(
        "//td[text()='Germany']/preceding-sibling::td"
    );

    await expect(leftSiblings).toHaveCount(2);

});


/*
====================================================
📌 Important XPath Axes Summary
====================================================

1. self::
   → current element itself

2. parent::
   → immediate parent

3. child::
   → direct children

4. ancestor::
   → parent/grandparent hierarchy

5. descendant::
   → all nested children

6. following::
   → elements after current element

7. following-sibling::
   → siblings to the right

8. preceding::
   → elements before current element

9. preceding-sibling::
   → siblings to the left
*/


/*
====================================================
📌 normalize-space()
====================================================

normalize-space():

- removes extra spaces
- trims leading/trailing spaces

Useful when webpage text contains:
- unwanted spacing
- formatting spaces
- line breaks

Example:
normalize-space()='Germany'
*/


/*
====================================================
📌 Real Project Insight
====================================================

1. XPath Axes are useful when:
   - elements have no unique attributes
   - navigating complex tables
   - working with dynamic structures

2. following-sibling and parent axes
   are heavily used in table automation.

3. Avoid overly complicated XPath.
   Complex locators become hard to maintain.

4. Prefer Playwright locators when possible:
   - getByRole()
   - getByLabel()
   - getByTestId()

5. XPath should be readable and maintainable.
*/