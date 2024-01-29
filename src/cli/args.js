import { argv } from 'node:process';

const parseArgs = () => {
    const [, , ...args] = argv;
    for (let i = 0; i < argv.length; i = i + 2) {
        console.log(`${argv[i].slice(2)} is ${argv[i + 1]}`);
    }
};

parseArgs();
