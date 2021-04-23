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

for (let i = 0; i < n - 2; i++) {
  let j = i + 1;
  let k = n - 1;

  while (j < k) {
    const value1 = input[i];
    const value2 = input[j];
    const value3 = input[k];
    
    const sum = value1 + value2 + value3;
    
    // console.log(i, j, k, 'check', value1, '+', value2, ' + ', value3, '=', sum);
    
    if (sum === expectedSum) {
      console.log('result', value1, '+', value2, '+', value3);
    }
    
    if (sum >= expectedSum) {
      --k;
    } else {
      ++j;
    }
  }
}

console.timeEnd('findSums');