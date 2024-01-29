import { env } from 'node:process';

const RSS_PREFIX = 'RSS_';

const parseEnv = () => {
    for (let variable in env) {
        if (variable.startsWith(RSS_PREFIX)) {
            console.log(`${variable}=${env[variable]}`);
        }
    }
};

parseEnv();
