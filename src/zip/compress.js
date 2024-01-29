import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';

const FILE_FOLDER = 'files';
const FILE_TO_COMPRESS = 'fileToCompress.txt';
const FILE_ARCHIVE = 'archive.txt.gz';

const handleStreamError = (e, stream) => {
    console.log(e.message);
    stream.destroy();
};

const compress = async () => {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const fileToCompressPath = join(__dirname, FILE_FOLDER, FILE_TO_COMPRESS);
    const fileToWritePath = join(__dirname, FILE_FOLDER, FILE_ARCHIVE);

    const readStream = createReadStream(fileToCompressPath);
    const writeStream = createWriteStream(fileToWritePath);
    const compressStream = createGzip();

    readStream
        .on('error', (e) => handleStreamError(e, readStream))
        .pipe(compressStream)
        .pipe(writeStream)
        .on('error', (e) => handleStreamError(e, readStream));
};

await compress();
