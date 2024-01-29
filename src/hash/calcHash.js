import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const FILE_FOLDER = 'files';
const FILE_TO_READ = 'fileToCalculateHashFor.txt';

const calculateHash = async () => {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const filePath = join(__dirname, FILE_FOLDER, FILE_TO_READ);

    const hashSum = createHash('sha256');
    const rs = createReadStream(filePath);

    rs.on('data', (chunk) => {
        hashSum.update(chunk);
    })
        .on('end', () => {
            console.log(hashSum.digest('hex'));
        })
        .on('error', (e) => {
            console.log('error', e.message);
        });
};

await calculateHash();
