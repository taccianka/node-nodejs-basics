import { createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'node:url';

const FILE_FOLDER = 'files';
const FILE_TO_WRITE = 'fileToWrite.txt';

const write = async () => {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const filePath = join(__dirname, FILE_FOLDER, FILE_TO_WRITE);

    const ws = createWriteStream(filePath);
    console.log('Write data for writing in file to console\nClick CTRL+C for exit');
    stdin
        .on('data', (data) => {
            ws.write(data);
        })
        .on('error', (e) => {
            console.log('error', e.message);
        });
};

await write();
