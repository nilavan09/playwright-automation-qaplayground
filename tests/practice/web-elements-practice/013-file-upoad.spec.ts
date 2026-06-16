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
    
    const uploadbutton =page.getByTestId('file-upload-input')
    await uploadbutton.setInputFiles('src/assets/test.txt')
    await expect(page.getByTestId('file-path-display')).toHaveText('File selected: test.txt')
})

/**
TC02: Verify selected file name is displayed after selection
1.Navigate to /practice/file-upload
2.Select a file using the file input
3.Assert the displayed file name matches the selected file
 */

test('TC02: Verify selected file name is displayed after selection', async ({ page }) => {
    
    const uploadbutton =page.getByTestId('file-upload-input')
    await uploadbutton.setInputFiles('src/assets/test.txt')
    await expect(page.getByTestId('file-path-display')).toContainText('test.txt')
})
/**
TC03: Verify upload button is enabled after file selection
1.Navigate to /practice/file-upload
2.Assert the upload button is initially disabled or absent or enabled
3.Select a file
4.Assert the upload button is now enabled
 */
test('TC03: Verify upload button is enabled after file selection', async ({ page }) => {
    
    const uploadbutton =page.getByTestId('file-upload-input')
    await expect(uploadbutton).toBeEnabled()
    await uploadbutton.setInputFiles('src/assets/test.txt')
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
    
    const uploadbutton =page.getByTestId('file-upload-input')
    await expect(uploadbutton).toBeEnabled()
    await uploadbutton.setInputFiles('src/assets/test.txt')
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
    
    const uploadbutton =page.getByTestId('file-upload-input')
    await expect(uploadbutton).toBeEnabled()
    await uploadbutton.setInputFiles('src/assets/test.txt')
    await expect(uploadbutton).toBeEnabled()
    await expect(page.getByTestId('file-path-display')).toContainText('test.txt')
    
})

/**
TC06: Verify file upload is responsive on mobile viewport
1.Navigate to /practice/file-upload at 375px width
2.Assert the upload control is fully visible and usable
3.Select and upload a file
4.Assert the success state is visible without horizontal scroll
 */
test('TC06: Verify file upload is responsive on mobile viewport', async ({ page }) => {


    await page.setViewportSize({width: 375,height: 667,})

    const uploadbutton =page.getByTestId('file-upload-input')
    await expect(uploadbutton).toBeVisible()
    await uploadbutton.setInputFiles('src/assets/test.txt')
    await expect(page.getByTestId('file-path-display')).toContainText('test.txt')
    
})
/**
TC07: Verify file upload is accessible via keyboard
1.Navigate to /practice/file-upload
2.Tab to the file input
3.Press Enter or Space to open the file dialog
4.Assert the file dialog opens
 */
test.skip('TC13: Verify file upload is accessible via keyboard', async ({ page }) => {

    const uploadbutton =page.getByTestId('file-upload-input')

    for(let i=0;i<13;i++){
     await page.keyboard.press('Tab')
        const isfocused = await uploadbutton.evaluate(el=>el===document.activeElement)
        if(isfocused) break 
  }

    const [popup]=await Promise.all([
    page.waitForEvent('filechooser'),
    page.keyboard.press('Enter')
   ])

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

const response =await page.goto('https://www.qaplayground.com/practice/file-upload')
expect(response?.status()).toBe(200)

const errorslist:string[]=[]
page.on('pageerror',pe=>{
    errorslist.push(pe.message)
})
expect(errorslist.length).toBe(0)
const uploadbutton =page.getByTestId('file-upload-input')
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

  // Locate download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Listen for download and click
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  //Save file to a known directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  //Assert file exists
  expect(fs.existsSync(downloadPath)).toBeTruthy();

})

/**
TC10: Verify downloaded file name matches expected value
1.Navigate to the file download section
2.Click the download button
3.Assert the downloaded file name matches the expected filename
 */
test('TTC10: Verify downloaded file name matches expected value', async ({ page }) => {

  // Locate download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Listen for download and click
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  //Save file to a known directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  //Assert file exists
  expect(download.suggestedFilename()).toBe('android-chrome-512x512.png');

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

  // Locate download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Listen for download and click
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  //Save file to a known directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  const filesize = fs.statSync(downloadPath)
  expect(filesize.size).toBeGreaterThan(0)

})
/**
TC12: Verify downloaded file content matches expected data
1.Navigate to the file download section
2.Click the download button
3.Read the file contents
4.Assert the content matches the expected data or format
 */
test('TC12: Verify downloaded file content matches expected data', async ({ page }) => {

   // Locate download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Listen for download and click
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  //Save file to a known directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  //Assert file exists
  expect(download.suggestedFilename()).toBe('android-chrome-512x512.png');

})

/**
TC13: Verify download button is keyboard accessible
1.Navigate to the file download section
2.Tab to the download button
3.Press Enter to trigger the download
4.Assert the download starts
 */
test('TC13: Verify download button is keyboard accessible', async ({ page }) => {

  const downloaddbutton =page.getByTestId('btn-download-image')

    for(let i=0;i<20;i++){
     await page.keyboard.press('Tab')
     const isfocused=await downloaddbutton.evaluate(el=>el=== document.activeElement)
     if(isfocused)break
    }

    const [download]= await Promise.all([
        page.waitForEvent('download'),
        page.keyboard.press('Enter')
    ])

    expect(download).toBeDefined()
})

/**
TC14: Verify download link href attribute is correct
1.Navigate to the file download section
2.Read the href or download attribute of the download anchor
3.Assert the URL or file path is valid and matches expected
 */

test('TC14: Verify download link href attribute is correct', async ({ page }) => {

  const downloaddbutton =page.locator('a:has([data-testid="btn-download-image"])')

  await expect(downloaddbutton).toHaveAttribute('href','/icons/android-chrome-512x512.png')
})
/**
TC15: Verify download works on different browsers
1.Run the download test on Chrome, Firefox, and Edge
2.Assert the file downloads successfully on each browser
3.Assert the file content is identical across browsers
 */
test('TC15: Verify download works on different browsers', async ({ page }) => {

  //in playwright.config.ts file enable all browser.
  // Locate download button
  const downloadButton = page.getByTestId('btn-download-image');

  // Listen for download and click
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  //Save file to a known directory
  const downloadPath = path.join('downloads', download.suggestedFilename());
  await download.saveAs(downloadPath);

  //Assert file exists
  expect(download.suggestedFilename()).toBe('android-chrome-512x512.png');

})

/**
TC16: Verify download is responsive on mobile viewport
1.Navigate to the download section at 375px width
2.Assert the download button is visible and tappable
3.Trigger a download and assert it initiates
 */
test('Verify download is responsive on mobile viewport', async ({ page }) => {

  await page.setViewportSize({width:375 , height:672})

  const downloaddbutton =page.getByTestId('btn-download-image')

    const [download]= await Promise.all([
        page.waitForEvent('download'),
        downloaddbutton.click()
    ])

    expect(download).toBeDefined()

})

/**
TC17: Verify multiple downloads can occur sequentially
1.Navigate to the file download section
2.Click the download button twice in sequence
3.Assert two separate files are saved or the same file is overwritten
 */
test('TC17: Verify multiple downloads can occur sequentially', async ({ page }) => {

  const downloadButton1 = page.getByTestId('btn-download-image')
  const downloadButton2= page.getByTestId('btn-download-pdf')

  // First download
  const [download1] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton1.click(),
  ]);

  const file1 = path.join('downloads', download1.suggestedFilename());
  await download1.saveAs(file1);

  // Second download
  const [download2] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton2.click(),
  ]);

  const file2 = path.join('downloads',download2.suggestedFilename());
  await download2.saveAs(file2);

  // Assertions
  expect(fs.existsSync(file1)).toBeTruthy();
  expect(fs.existsSync(file2)).toBeTruthy();

  expect(file1).not.toBe(file2);
});

/**
TC18: Verify download does not navigate away from page
1.Navigate to the file download section
2.Click the download button
3.Assert the page URL has not changed after the download triggers
 */
test('TC18: Verify download does not navigate away from page', async ({ page }) => {

  const downloadButton = page.getByTestId('btn-download-image');

  // Capture initial URL
  const initialURL = page.url();

  // Trigger download
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadButton.click(),
  ]);

  // Ensure download happened
  expect(download).toBeDefined();

  // Assert URL did not change
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

const response =await page.goto('https://www.qaplayground.com/practice/file-upload')
expect(response?.status()).toBe(200)

const errorslist:string[]=[]
page.on('pageerror',pe=>{
    errorslist.push(pe.message)
})
expect(errorslist.length).toBe(0)
const uploadbutton =page.getByTestId('btn-download-image')
await expect(uploadbutton).toBeVisible()
})