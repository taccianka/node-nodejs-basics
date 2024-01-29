import { stdin, stdout } from 'node:process';
import { Transform } from 'node:stream';
import { EOL } from 'node:os';

const transform = async () => {
    const reverse = new Transform({
        transform(data, encoding, callback) {
            let formattedStringData = data.toString().replace(EOL, '');
            let reversedString = formattedStringData
                .split('')
                .reverse()
                .join('');
            let resultString = reversedString + EOL;
            callback(null, resultString);
        },
    });

    stdin
        .pipe(reverse)
        .pipe(stdout)
        .on('error', (e) => {
            console.log('error', e.message);
        });
};

await transform();
