const input = 312051;
const R = require('ramda');

//Part 1
// 312051 = 558 * 559 + 128
//558 - 128 = 430


const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]]; //R, U, L, D
const surroundings = dirs.concat(R.xprod([1, -1],[-1, 1]));

let map = {
    '0, 0': 1
};

let state = {
    dir: 0,
    count: 1,
    currentCount: 1,
    location: [0, 0]
};
const getMapValue = R.compose(R.propOr(0, R.__, map), ([x, y]) => `${x}, ${y}`);
const setMapValue = ([x, y], value) => {
    map[`${x}, ${y}`] = value;
};

const getValue = (location) => {
    const locations = R.map(R.zipWith(R.add, location))(surroundings);
    return R.sum(R.map(getMapValue, locations));
};

const nextState = (state) => {
    if (!state.currentCount) {
        state.count = state.dir % 2 ? state.count + 1 : state.count;
        state.dir = (state.dir + 1) % 4;
        state.currentCount = state.count;
    }
    state.location = R.zipWith(R.add, dirs[state.dir], state.location);
    state.currentCount = state.currentCount - 1;
    const currentVal = getValue(state.location);
    if (currentVal < input) {
        setMapValue(state.location, currentVal);
        return nextState(state);
    }
    console.log(currentVal, state.location, map);
};

nextState(state);
