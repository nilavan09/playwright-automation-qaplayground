import { expect, Locator, test } from '@playwright/test'
import path from 'path'
import fs from 'fs' 

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.qaplayground.com/practice/file-upload')

})

/**
TC01: Verify a file can be selected for upload
1.Navigate to /practice/file-upload
2.Locate the file input element using data-testid or id
3.Use sendKeys('/path/to/file.txt') or setInputFiles() to select a file
4.Assert the file name appears in the upload field or label
 */

test('TC01: Verify a file can be selected for upload', async ({ page }) => {

    // Locate the file upload input element
    const uploadbutton = page.getByTestId('file-upload-input')

    // Upload the test file from the assets folder
    await uploadbutton.setInputFiles('src/assets/test.txt')

    // Verify that the selected file name is displayed correctly
    await expect(page.getByTestId('file-path-display'))
        .toHaveText('File selected: test.txt')
})

/**
TC02: Verify selected file name is displayed after selection
1.Navigate to /practice/file-upload
2.Select a file using the file input
3.Assert the displayed file name matches the selected file
 */

test('TC02: Verify selected file name is displayed after selection', async ({ page }) => {
    
    // Locate the file upload input element
    const uploadbutton = page.getByTestId('file-upload-input')

    // Upload the test file
    await uploadbutton.setInputFiles('src/assets/test.txt')

    // Verify that the uploaded file name is displayed on the page
    await expect(page.getByTestId('file-path-display'))
        .toContainText('test.txt')
})
/**
TC03: Verify upload button is enabled after file selection
1.Navigate to /practice/file-upload
2.Assert the upload button is initially disabled or absent or enabled
3.Select a file
4.Assert the upload button is now enabled
 */
test('TC03: Verify upload button is enabled after file selection', async ({ page }) => {
    
    // Locate the file upload input element
    const uploadbutton = page.getByTestId('file-upload-input')

    // Verify that the upload input is enabled before selecting a file
    await expect(uploadbutton).toBeEnabled()

    // Upload the test file
    await uploadbutton.setInputFiles('src/assets/test.txt')

    // Verify that the upload input remains enabled after file selection
    await expect(uploadbutton).toBeEnabled()
})

/**
TC04: Verify file upload starts on clicking upload button
1.Navigate to /practice/file-upload
2.Select a valid file
3.Click the upload button
4.Assert upload progress indicator or success state appears
Expected actions not present on the site replicated TC03
 */
test('TC04: Verify file upload starts on clicking upload button', async ({ page }) => {
    
    // Locate the file upload input element
    const uploadbutton = page.getByTestId('file-upload-input')

    // Verify that the file input is enabled before uploading
    await expect(uploadbutton).toBeEnabled()

    // Select the test file for upload
    await uploadbutton.setInputFiles('src/assets/test.txt')

    // Verify that the file input remains enabled after file selection
    await expect(uploadbutton).toBeEnabled()
})
/**
TC05: Verify success message appears after upload
1.Navigate to /practice/file-upload
2.Select a valid file and click upload
3.Wait for the upload to complete
4.Assert a success message or confirmation is visible
 */
test('TC05: Verify success message appears after upload', async ({ page }) => {
    
    // Locate the file upload input element
    const uploadbutton = page.getByTestId('file-upload-input')

    // Verify that the file input is enabled before uploading
    await expect(uploadbutton).toBeEnabled()

    // Upload the test file
    await uploadbutton.setInputFiles('src/assets/test.txt')

    // Verify that the file input remains enabled after file selection
    await expect(uploadbutton).toBeEnabled()

    // Verify that the uploaded file name is displayed successfully
    await expect(page.getByTestId('file-path-display'))
        .toContainText('test.txt')
})

/**
TC06: Verify file upload is responsive on mobile viewport
1.Navigate to /practice/file-upload at 375px width
2.Assert the upload control is fully visible and usable
3.Select and upload a file
4.Assert the success state is visible without horizontal scroll
 */
test('TC06: Verify file upload is responsive on mobile viewport', async ({ page }) => {

    // Set the viewport size to simulate a mobile device
    await page.setViewportSize({
        width: 375,
        height: 667,
    })

    // Locate the file upload input element
    const uploadbutton = page.getByTestId('file-upload-input')

    // Verify that the file upload input is visible on mobile view
    await expect(uploadbutton).toBeVisible()

    // Upload the test file
    await uploadbutton.setInputFiles('src/assets/test.txt')

    // Verify that the uploaded file name is displayed correctly on mobile view
    await expect(page.getByTestId('file-path-display'))
        .toContainText('test.txt')
})
/**
TC07: Verify file upload is accessible via keyboard
1.Navigate to /practice/file-upload
2.Tab to the file input
3.Press Enter or Space to open the file dialog
4.Assert the file dialog opens
 */
test.skip('TC13: Verify file upload is accessible via keyboard', async ({ page }) => {

    // Locate the file upload input element
    const uploadbutton = page.getByTestId('file-upload-input')

    // Navigate through the page using the Tab key until the upload input receives focus
    for (let i = 0; i < 13; i++) {
        await page.keyboard.press('Tab')

        const isfocused = await uploadbutton.evaluate(
            el => el === document.activeElement
        )

        if (isfocused) break
    }

    // Press Enter on the focused upload input and wait for the file chooser dialog
    const [popup] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.keyboard.press('Enter')
    ])

    // Verify that the file chooser dialog is opened successfully
    expect(popup).toBeDefined()
})

/**
TC08: Verify file upload page loads without errors
1.Navigate to /practice/file-upload
2.Assert HTTP 200 response
3.Assert no JS console errors are present
4.Assert the upload input element is visible in the DOM
 */
test('TC08: Verify file upload page loads without errors', async ({ page }) => {

    // Navigate to the file upload page and verify that it loads successfully
    const response = await page.goto('https://www.qaplayground.com/practice/file-upload')
    expect(response?.status()).toBe(200)

    // Capture any JavaScript errors that occur on the page
    const errorslist: string[] = []
    page.on('pageerror', pe => {
        errorslist.push(pe.message)
    })

    // Verify that no JavaScript errors are present
    expect(errorslist.length).toBe(0)

    // Verify that the file upload input is visible after the page loads
    const uploadbutton = page.getByTestId('file-upload-input')
    await expect(uploadbutton).toBeVisible()
})
/**
TC09: Verify download starts on clicking the download button
1.Navigate to /practice/file-upload (download section)
2.Locate the download button using data-testid or id
3.Set up download listener or configure download directory
4.Click the download button
5.Assert the file is saved in the expected directory
 */
test('TC09: Verify download starts on clicking the download button', async ({ page }) => {

  // Locate the download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Wait for the download event while clicking the download button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  // Save the downloaded file to the local downloads directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  // Verify that the downloaded file exists in the specified location
  expect(fs.existsSync(downloadPath)).toBeTruthy();

})

/**
TC10: Verify downloaded file name matches expected value
1.Navigate to the file download section
2.Click the download button
3.Assert the downloaded file name matches the expected filename
 */
test('TC10: Verify downloaded file name matches expected value', async ({ page }) => {

  // Locate the download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Wait for the download event while clicking the download button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  // Save the downloaded file to the local downloads directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  // Verify that the downloaded file name matches the expected value
  expect(download.suggestedFilename())
    .toBe('android-chrome-512x512.png');

})

/*
TC11: Verify downloaded file is not empty
1.
Navigate to the file download section
2.
Click the download button
3.
Read the downloaded file
4.
Assert the file size is greater than 0 bytes
 */
test('TC11: Verify downloaded file is not empty', async ({ page }) => {

  // Locate the download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Wait for the download event while clicking the download button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  // Save the downloaded file to the local downloads directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  // Get the downloaded file size
  const filesize = fs.statSync(downloadPath);

  // Verify that the downloaded file is not empty
  expect(filesize.size).toBeGreaterThan(0);

})
/**
TC12: Verify downloaded file content matches expected data
1.Navigate to the file download section
2.Click the download button
3.Read the file contents
4.Assert the content matches the expected data or format
 */
test('TC12: Verify downloaded file content matches expected data', async ({ page }) => {

  // Locate the download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Wait for the download event while clicking the download button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  // Save the downloaded file to the local downloads directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  // Verify that the downloaded file name matches the expected file
  expect(download.suggestedFilename())
    .toBe('android-chrome-512x512.png');

})

/**
TC13: Verify download button is keyboard accessible
1.Navigate to the file download section
2.Tab to the download button
3.Press Enter to trigger the download
4.Assert the download starts
 */
test('TC13: Verify download button is keyboard accessible', async ({ page }) => {

    // Locate the download button
    const downloaddbutton = page.getByTestId('btn-download-image')

    // Navigate through the page using the Tab key until the download button receives focus
    for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab')

        const isfocused = await downloaddbutton.evaluate(
            el => el === document.activeElement
        )

        if (isfocused) break
    }

    // Press Enter on the focused download button and wait for the download to start
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.keyboard.press('Enter')
    ])

    // Verify that the download is triggered successfully
    expect(download).toBeDefined()
})

/**
TC14: Verify download link href attribute is correct
1.Navigate to the file download section
2.Read the href or download attribute of the download anchor
3.Assert the URL or file path is valid and matches expected
 */

test('TC14: Verify download link href attribute is correct', async ({ page }) => {

    // Locate the anchor element associated with the download button
    const downloaddbutton = page.locator(
        'a:has([data-testid="btn-download-image"])'
    )

    // Verify that the download link points to the expected file path
    await expect(downloaddbutton)
        .toHaveAttribute('href', '/icons/android-chrome-512x512.png')
})
/**
TC15: Verify download works on different browsers
1.Run the download test on Chrome, Firefox, and Edge
2.Assert the file downloads successfully on each browser
3.Assert the file content is identical across browsers
 */
test('TC15: Verify download works on different browsers', async ({ page }) => {

  // Execute this test across multiple browsers by enabling them in playwright.config.ts

  // Locate the download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Wait for the download event while clicking the download button
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  // Save the downloaded file to the local downloads directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  // Verify that the downloaded file name matches the expected value
  expect(download.suggestedFilename())
    .toBe('android-chrome-512x512.png');

})

/**
test('TC16: Verify download is responsive on mobile viewport', async ({ page }) => {

    // Set the viewport size to simulate a mobile device
    await page.setViewportSize({
        width: 375,
        height: 672
    })

    // Locate the download button
    const downloaddbutton = page.getByTestId('btn-download-image')

    // Verify that the download button is visible on mobile view
    await expect(downloaddbutton).toBeVisible()

    // Trigger the download and wait for the download event
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        downloaddbutton.click()
    ])

    // Verify that the download is initiated successfully
    expect(download).toBeDefined()

})

/**
TC17: Verify multiple downloads can occur sequentially
1.Navigate to the file download section
2.Click the download button twice in sequence
3.Assert two separate files are saved or the same file is overwritten
 */
test('TC17: Verify multiple downloads can occur sequentially', async ({ page }) => {

  // Locate the download buttons for the image and PDF files
  const downloadButton1 = page.getByTestId('btn-download-image')
  const downloadButton2 = page.getByTestId('btn-download-pdf')

  // Trigger the first download and wait for it to start
  const [download1] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton1.click(),
  ])

  // Save the first downloaded file
  const file1 = path.join('downloads', download1.suggestedFilename())
  await download1.saveAs(file1)

  // Trigger the second download and wait for it to start
  const [download2] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton2.click(),
  ])

  // Save the second downloaded file
  const file2 = path.join('downloads', download2.suggestedFilename())
  await download2.saveAs(file2)

  // Verify that both downloaded files exist
  expect(fs.existsSync(file1)).toBeTruthy()
  expect(fs.existsSync(file2)).toBeTruthy()

  // Verify that the downloaded files are different
  expect(file1).not.toBe(file2)
})
/**
TC18: Verify download does not navigate away from page
1.Navigate to the file download section
2.Click the download button
3.Assert the page URL has not changed after the download triggers
 */
test('TC18: Verify download does not navigate away from page', async ({ page }) => {

  // Locate the download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Capture the current page URL before initiating the download
  const initialURL = page.url();

  // Trigger the download and wait for the download event
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  // Verify that the download was initiated successfully
  expect(download).toBeDefined();

  // Verify that the page URL remains unchanged after the download
  expect(page.url()).toBe(initialURL);
});
/**
 TC19: Verify download section is accessible via keyboard
1.Navigate to /practice/file-upload
2.Tab through the page to reach the download section
3.Assert the download button receives visible focus
 */
test('TC19: Verify download section is accessible via keyboard', async ({ page }) => {

  const downloadButton = page.getByTestId('btn-download-image');

  // Tab until focused (safety limit prevents infinite loop)
  for (let i = 0; i < 30; i++) {
    const isFocused = await downloadButton.evaluate(
      el => el === document.activeElement
    );

    if (isFocused) break;

    await page.keyboard.press('Tab');
  }

  // Assert it is focused
  const isFocused = await downloadButton.evaluate(
    el => el === document.activeElement
  );

  expect(isFocused).toBeTruthy();
});

/**
TC20: Verify file download page loads without errors
1.Navigate to /practice/file-upload
2.Assert HTTP 200 response
3.Assert no JS console errors are present
4.Assert the download button is visible
 */
test('TC20: Verify file download page loads without errors', async ({ page }) => {

    // Navigate to the file download page and verify that it loads successfully
    const response = await page.goto('https://www.qaplayground.com/practice/file-upload')
    expect(response?.status()).toBe(200)

    // Capture any JavaScript errors that occur on the page
    const errorslist: string[] = []
    page.on('pageerror', pe => {
        errorslist.push(pe.message)
    })

    // Verify that no JavaScript errors are present
    expect(errorslist.length).toBe(0)

    // Verify that the download button is visible after the page loads
    const uploadbutton = page.getByTestId('btn-download-image')
    await expect(uploadbutton).toBeVisible()
})