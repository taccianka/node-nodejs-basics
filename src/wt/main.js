import { Worker } from 'node:worker_threads';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const FILE_WITH_WORKER = 'worker.js';

const performCalculations = async () => {
    const __dirname = fileURLToPath(new URL('.', import.meta.url));
    const filePath = join(__dirname, FILE_WITH_WORKER);
    let fibonacciNumber = 10;

    const cpuInfoArray = os.cpus();

    const results = await Promise.allSettled(
        cpuInfoArray.map(() => {
            return new Promise((resolve, reject) => {
                let worker = new Worker(filePath, {
                    workerData: fibonacciNumber++,
                });

                worker
                    .on('message', (result) => {
                        resolve(result);
                    })
                    .on('error', () => {
                        reject();
                    });
            });
        })
    );

    const formattedResults = results.map(({ status, value }) => {
        return {
            status: status === 'fulfilled' ? 'resolved' : 'error',
            data: status === 'fulfilled' ? value : null,
        }
    });

    console.log(formattedResults);
};

await performCalculations();
