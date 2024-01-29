import { execFile, fork, spawn } from 'node:child_process';
import { join } from 'node:path';
import { stdin } from 'node:process';
import { fileURLToPath } from 'node:url';

const FILE_FOLDER = 'files';
const FILE_WITH_SCRIPT = 'script.js';

const spawnChildProcess = async (args) => {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const filePath = join(__dirname, FILE_FOLDER, FILE_WITH_SCRIPT);

    const child = spawn('node', [filePath, ...args], {
        stdio: [null, null, null, 'ipc'],
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['test, test2']);
