import { expect, Download } from '@playwright/test';

export class FileUtils {
    static async validateDownload(download: Download, expectedExtension: string) {

        const fileName = download.suggestedFilename();

        expect(fileName).toMatch(new RegExp(`\\.${expectedExtension}$`));

        console.log(`Downloaded file: ${fileName}`);

        return fileName;
    }
}