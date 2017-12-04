const fs = require('fs');
const R = require('ramda');

const noDupes = line => new Set(line).size === line.length
const sortWords = (line) => line.map(w => w.split('').sort().join(''));

const p1 = R.filter(noDupes);

const p2 = R.filter(R.compose(noDupes, sortWords));

fs.readFile('./d4/input.txt', (err, result) => {
    const input = R.init(result.toString().split('\n').map(r => r.split(/\W+/g).filter(Boolean)));
    console.log(p1(input).length);
    console.log(p2(input).length);
});
