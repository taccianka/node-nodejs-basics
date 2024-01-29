import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile, unlink } from 'node:fs/promises';

const FILE_FOLDER = 'files';
const FILE_TO_REMOVE = 'fileToRemove.txt';

const remove = async () => {
    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const filePath = path.join(__dirname, FILE_FOLDER, FILE_TO_REMOVE);

        try {
            await readFile(filePath, { flag: 'r' });
        } catch {
            throw new Error('FS operation failed');
        }

        await unlink(filePath);
    } catch (e) {
        console.error(e.message);
    }
};

await remove();
