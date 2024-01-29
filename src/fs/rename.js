import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, rename as renameFile } from 'node:fs/promises';

const FILE_FOLDER = 'files';
const FILE_TO_RENAME = 'wrongFileName.txt';
const FILE_NAME_RIGHT = 'properFileName.md';

const rename = async () => {
    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const filePath = path.join(__dirname, FILE_FOLDER, FILE_TO_RENAME);
        const newFilePath = path.join(__dirname, FILE_FOLDER, FILE_NAME_RIGHT);

        try {
            await readFile(filePath, { flag: 'r' });
            await readFile(newFilePath, { flag: 'wx+' });
        } catch {
            throw new Error('FS operation failed');
        }

        await renameFile(filePath, newFilePath);
    } catch (e) {
        console.error(e.message);
    }
};

await rename();
