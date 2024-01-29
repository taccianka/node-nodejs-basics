import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createUnzip } from 'node:zlib';

const FILE_FOLDER = 'files';
const FILE_DECOMPRESSED = 'decompressed.txt';
const FILE_ARCHIVE = 'archive.txt.gz';

const handleStreamError = (e, stream) => {
    console.log(e.message);
    stream.destroy();
};

const decompress = async () => {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const fileToReadPath = join(__dirname, FILE_FOLDER, FILE_ARCHIVE);
    const fileToWritePath = join(__dirname, FILE_FOLDER, FILE_DECOMPRESSED);

    const readStream = createReadStream(fileToReadPath);
    const writeStream = createWriteStream(fileToWritePath);
    const compressStream = createUnzip();

    readStream
        .on('error', (e) => handleStreamError(e, readStream))
        .pipe(compressStream)
        .pipe(writeStream)
        .on('error', (e) => handleStreamError(e, readStream));
};

await decompress();
