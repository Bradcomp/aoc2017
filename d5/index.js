const fs = require('fs');
const R = require('ramda');

fs.readFile('./d5/input.txt', (err, result) => {
    const offsets = R.init(result.toString().split('\n').map(Number));
    let index = 0;
    let stepCount = 0;
    console.log(offsets.length);
    while (true) {
        let jump = offsets[index];
        offsets[index] = jump + (jump > 2 ? -1 : 1);
        index = index + jump;
        stepCount = stepCount + 1;
        if (index < 0 || index >= offsets.length) {
            console.log(stepCount);
            process.exit(0);
        }
    }
});
