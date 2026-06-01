/*
========================================
📌 Playwright Form Element Actions
Description:
This file demonstrates interaction with:

- Text Boxes / Input Fields
- Radio Buttons
- Checkboxes

Topics Covered:
- fill()
- inputValue()
- getAttribute()
- check()
- uncheck()
- isChecked()
- assertions
========================================
*/


import { test, expect, Locator } from "@playwright/test";


// ====================================================
// Test Case 1 - Text Box / Input Field
// ====================================================

test("Text Input Action", async ({ page }) => {

    await page.goto(
        "https://testautomationpractice.blogspot.com/"
    );


    // ====================================================
    // Locate Text Box
    // ====================================================

    /*
    #name
    → CSS ID selector

    fill()
    → clears existing value and enters new text
    */

    const textBox: Locator = page.locator("#name");

    await textBox.fill("test");


    // ====================================================
    // Assertions
    // ====================================================

    /*
    toBeVisible()
    → validates element is visible

    toBeEnabled()
    → validates element is enabled
    */

    await expect(textBox).toBeVisible();

    await expect(textBox).toBeEnabled();


    // ====================================================
    // getAttribute()
    // ====================================================

    /*
    Returns value of HTML attribute.

    maxlength="15"
    */

    const maxLength: string | null =
        await textBox.getAttribute("maxlength");

    console.log(maxLength);

    expect(maxLength).toBe("15");


    // ====================================================
    // Enter Maximum Allowed Characters
    // ====================================================

    await textBox.fill("123456789012345");


    // ====================================================
    // textContent() vs inputValue()
    // ====================================================

    /*
    textContent()
    → does NOT work for input fields

    inputValue()
    → returns entered value from input box
    */

    console.log(
        "Input text:",
        await textBox.inputValue()
    );


    // ====================================================
    // Validate Entered Input
    // ====================================================

    const enteredValue: string =
        await textBox.inputValue();

    expect(enteredValue).toBe(
        "123456789012345"
    );

});


// ====================================================
// Test Case 2 - Radio Buttons
// ====================================================

test("Radio Button Action", async ({ page }) => {

    await page.goto(
        "https://testautomationpractice.blogspot.com/"
    );


    // ====================================================
    // Select Male Radio Button
    // ====================================================

    const maleButton: Locator =
        page.locator("#male");

    await maleButton.click();


    // ====================================================
    // Select Female Radio Button
    // ====================================================

    /*
    getByRole('radio')
    → accessibility-based locator

    Recommended for radio buttons.
    */

    const femaleButton: Locator =
        page.getByRole("radio", {
            name: "Female"
        });

    await femaleButton.click();


    // ====================================================
    // Assertions
    // ====================================================

    await expect(femaleButton).toBeVisible();

    await expect(femaleButton).toBeEnabled();

    await expect(femaleButton).toBeChecked();


    // ====================================================
    // isChecked()
    // ====================================================

    /*
    Returns:
    true  → selected
    false → not selected
    */

    expect(
        await femaleButton.isChecked()
    ).toBe(true);

});


// ====================================================
// Test Case 3 - Checkboxes
// ====================================================

test("Checkbox Actions", async ({ page }) => {

    await page.goto(
        "https://testautomationpractice.blogspot.com/"
    );


    // ====================================================
    // 1. Select Specific Checkbox
    // ====================================================

    /*
    check()
    → selects checkbox

    uncheck()
    → deselects checkbox
    */

    const sundayCheckbox: Locator =
        page.getByLabel("Sunday");

    await sundayCheckbox.check();

    await expect(sundayCheckbox).toBeChecked();


    // ====================================================
    // 2. Select All Checkboxes
    // ====================================================

    /*
    count()
    → returns number of matched elements
    */

    const checkboxes: Locator =
        page.locator(
            "div>input.form-check-input[type='checkbox']"
        );

    const checkboxCount: number =
        await checkboxes.count();

    console.log(
        "Total checkboxes:",
        checkboxCount
    );


    // ====================================================
    // Loop Through Checkboxes
    // ====================================================

    /*
    nth(index)
    → selects element by index
    */

    for (let i = 0; i < checkboxCount; i++) {

        await checkboxes.nth(i).check();

        await expect(
            checkboxes.nth(i)
        ).toBeChecked();

        await checkboxes.nth(i).uncheck();

    }


    // ====================================================
    // Cleaner Loop Version
    // ====================================================

    for (let i = 0; i < checkboxCount; i++) {

        const checkbox = checkboxes.nth(i);

        await checkbox.check();

        await expect(checkbox).toBeChecked();

        await checkbox.uncheck();

    }


    // ====================================================
    // Select All Days Using Labels
    // ====================================================

    const days: string[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];


    /*
    map()
    → creates locator array
    */

    const dayCheckboxes: Locator[] =
        days.map(day =>
            page.getByLabel(day)
        );


    // ====================================================
    // Check All Days
    // ====================================================

    for (const checkbox of dayCheckboxes) {

        await checkbox.check();

        await expect(checkbox).toBeChecked();

    }


    // ====================================================
    // Uncheck Last 3 Days
    // ====================================================

    /*
    slice(-3)
    → returns last 3 elements
    */

    for (const checkbox of dayCheckboxes.slice(-3)) {

        await checkbox.uncheck();

        await expect(checkbox)
            .not
            .toBeChecked();

    }


    // ====================================================
    // Toggle Checkboxes
    // ====================================================

    /*
    Toggle Logic:
    - if checked → uncheck
    - if unchecked → check
    */

    for (const checkbox of dayCheckboxes) {

        if (await checkbox.isChecked()) {

            await checkbox.uncheck();

            await expect(checkbox)
                .not
                .toBeChecked();

        } else {

            await checkbox.check();

            await expect(checkbox)
                .toBeChecked();

        }

    }


    // ====================================================
    // Random Checkbox Selection by Index
    // ====================================================

    /*
    Select:
    - index 1
    - index 3
    - index 6
    */

    const indexes: number[] = [1, 3, 6];

    for (const index of indexes) {

        await dayCheckboxes[index].check();

        await expect(
            dayCheckboxes[index]
        ).toBeChecked();

    }

});


/*
====================================================
📌 Important Playwright Methods
====================================================

1. fill()
   → enter text into input fields

2. inputValue()
   → get current input value

3. getAttribute()
   → fetch HTML attribute value

4. check()
   → select checkbox/radio button

5. uncheck()
   → deselect checkbox

6. isChecked()
   → returns checkbox/radio state

7. count()
   → total matched elements

8. nth(index)
   → access element using index
*/


/*
====================================================
📌 textContent() vs inputValue()
====================================================

textContent():
❌ does not work correctly for input fields

Reason:
Input value is stored inside "value"
attribute, not inside visible text node.

inputValue():
✔ correct method for text boxes
*/


/*
====================================================
📌 Real Project Insight
====================================================

1. Prefer:
   - getByRole()
   - getByLabel()

   over complex XPath whenever possible.

2. Assertions improve:
   ✔ test reliability
   ✔ debugging
   ✔ validation accuracy

3. check() is safer than click()
   for checkboxes/radio buttons.

4. Loops are heavily used when:
   - validating tables
   - selecting multiple checkboxes
   - bulk form operations

5. Dynamic locator arrays are common
   in real automation frameworks.
*/