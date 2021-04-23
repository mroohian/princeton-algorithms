const { args } = Deno;

import { generateDataSorted } from '../data/generateData.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateDataSorted(n, min, max);

const expectedSum = 0;

console.log('input', input);
console.log('expectedSum', expectedSum);

console.time('findSums');

let start = 0;
let end = n - 1;
while(start <= end) {
  const startValue = input[start];
  const endValue = input[end];

  const sum = startValue + endValue;

  // console.log('check', startValue, '+', endValue, '=', sum);

  if (sum > expectedSum) {
    end--;
  } else if (sum < expectedSum) {
    start++;
  } else {
    console.log('result', startValue, '+', endValue);
    start++;
  }
}

console.timeEnd('findSums');
