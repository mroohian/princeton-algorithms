const { args } = Deno;

import { binarySearch } from '../search/binary_search/binary_search.ts';
import { generateDataSorted } from '../data/generateData.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateDataSorted(n, min, max);

const expectedSum = 0;

console.log('input', input);
console.log('expectedSum', expectedSum);

console.time('findSums');

for (let i = 0; i < n; i++) {
  const value1 = input[i];

  for (let j = i; j < n; j++) {
    const value2 = input[j];

    const value3ComplementIndex = binarySearch(input, expectedSum - value1 - value2);
  
    // console.log(i, j, 'check', value1, '+', value2, ' with ', expectedSum - value1 - value2);

    if (value3ComplementIndex !== -1) {
      console.log('result', value1, '+', value2, '+', input[value3ComplementIndex]);
    }
  }
}

console.timeEnd('findSums');