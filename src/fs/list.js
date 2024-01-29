import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { opendir } from 'node:fs/promises';

const FILE_FOLDER = 'files';

const list = async () => {
    try {
        const __dirname = fileURLToPath(new URL('.', import.meta.url));
        const folderPath = join(__dirname, FILE_FOLDER);

        let dir;

        try {
            dir = await opendir(folderPath);
        } catch {
            throw new Error('FS operation failed');
        }

        for await (const file of dir) {
            console.log(file.name);
        }
    } catch (e) {
        console.error(e.message);
    }
};

await list();
