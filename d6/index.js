'use strict';
const R = require('ramda');

let input = [11, 11, 13, 7, 0, 15, 5, 5, 4, 4, 1, 1, 7, 1, 15, 11];

const used = new Set([input.join(',')]);

const next = (n) => (n + 1) % input.length;

const moveColumn = (input) => {
    let maxValue = Math.max.apply(null, input);
    let index = input.indexOf(maxValue);
    input[index] = 0;
    while (maxValue) {
        index = next(index);
        input[index] = input[index] + 1;
        maxValue--;
    }
    return input;
};

let steps = 0;
while (true) {
    steps++
    input = moveColumn(input);
    let setStr = input.join(',');
    if (used.has(setStr)) {
        console.log(`P1: ${steps}`);
        steps = 0;
        while (true) {
            steps++;
            input = moveColumn(input);
            if (input.join(',') === setStr) {
                console.log(`P2: ${steps}`)
                process.exit(0);
            }
        }

    }
    used.add(setStr);
};
