import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE_FOLDER = 'files';
const FILE_TO_READ = 'fresh.txt';

const create = async () => {
    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const filePath = join(__dirname, FILE_FOLDER, FILE_TO_READ);

        try {
            await readFile(filePath, { flag: 'wx+' });
        } catch {
            throw new Error('FS operation failed');
        }

        await writeFile(filePath, 'I am fresh and young');
    } catch (e) {
        console.error(e.message);
    }
};

await create();
