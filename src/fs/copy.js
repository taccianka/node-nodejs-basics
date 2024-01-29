import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { copyFile, mkdir, opendir } from 'node:fs/promises';
import { constants } from 'node:fs';

const SOURCE_FOLDER = 'files';
const DESTINATION_FOLDER = 'files_copy';

const copy = async () => {
    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const sourceFolderPath = join(__dirname, SOURCE_FOLDER);
        const destinationFolderPath = join(__dirname, DESTINATION_FOLDER);

        let dir;

        try {
            dir = await opendir(sourceFolderPath);
            await mkdir(destinationFolderPath);
        } catch {
            throw new Error('FS operation failed');
        }

        for await (const file of dir) {
            let fileName = file.name;
            let sourceFilePath = join(sourceFolderPath, fileName);
            let destinationFilePath = join(destinationFolderPath, fileName);
            await copyFile(sourceFilePath, destinationFilePath);
        }
    } catch (e) {
        console.error(e.message);
    }
};

await copy();
