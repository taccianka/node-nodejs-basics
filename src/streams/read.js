import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { stdout } from 'node:process';
import { fileURLToPath } from 'node:url';

const FILE_FOLDER = 'files';
const FILE_TO_READ = 'fileToRead.txt';

const handleStreamError = (e, stream) => {
    console.log(e.message);
    stream.destroy();
};

const read = async () => {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const filePath = join(__dirname, FILE_FOLDER, FILE_TO_READ);

    const rs = createReadStream(filePath);

    rs.on('error', (e) => handleStreamError(e, rs)).pipe(stdout);
};

await read();
