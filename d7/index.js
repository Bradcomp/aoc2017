'use strict';
const fs = require('fs');
const R = require('ramda');

const parseLine = (line) => {
    const [left, right] = line.split(' -> ');
    let [_, lval, weight] = R.match(/(\w+) \((\d+)\)/, left);
    weight = parseInt(weight, 10);
    const children = (right || '').split(', ').map(s => s.trim()).filter(Boolean);

    return { lval, weight, children }
};
const allEq = arr => new Set(arr).size === 1;
const makeTree = (root, bank) => {
    root.children = root.children.map(c => {
        const child = R.find(R.propEq('lval', c), bank);
        return makeTree(child, bank);
    });
    return root;
}
 const calculateWeight = (root) => {
     if (!root.children.length) {

         return root.weight;
     }
     const childrensWeights = R.map(calculateWeight, root.children);
     if (!allEq(childrensWeights)) {
         console.log(root.children, childrensWeights);
         process.exit(0);
     }
     return R.sum(childrensWeights) + root.weight;
 };
const part1 = (input) => {
    const allChilds = new Set(R.flatten(R.pluck('children', input)));

    const root = R.find(l => !allChilds.has(l.lval), input);
    return root;
};

const part2 = (input) => {
    const root = makeTree(part1(input), input);
    calculateWeight(root);
}

fs.readFile('./d7/input.txt', (err, result) => {
    const input = R.init(result.toString().split('\n')).map(parseLine);
    console.log(part1(input).lval);
    part2(input);
});
