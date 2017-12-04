const fs = require('fs');
const R = require('ramda');

const processLine = R.converge(R.subtract, [R.apply(Math.max), R.apply(Math.min)]);

const processLine2 = R.pipe(
  R.converge(R.xprod, [R.identity, R.identity]),
  R.reject(R.apply(R.equals)),
  R.find(([a, b]) => (a / b) === Math.floor(a / b) ),
  R.apply(R.divide)
)

fs.readFile('./d2/input.txt', (err, result) => {
    const input = R.init(result.toString().split('\n').map(r => r.split(/\W+/g).filter(Boolean).map(Number)));
    const p1 = R.sum(R.map(processLine, input));
    console.log(p1);
    const p2 = R.sum(R.map(processLine2, input));
    console.log(p2);
});
