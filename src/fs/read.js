import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE_FOLDER = 'files';
const FILE_TO_READ = 'fileToRead.txt';

const read = async () => {
    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const filePath = join(__dirname, FILE_FOLDER, FILE_TO_READ);

        try {
            await access(filePath);
        } catch {
            throw new Error('FS operation failed');
        }

        const fileContent = await readFile(filePath, {
            encoding: 'utf8',
        });
        console.log(fileContent);
    } catch (e) {
        console.error(e.message);
    }
};

await read();
