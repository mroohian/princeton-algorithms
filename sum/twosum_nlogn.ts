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
  const value = input[i];

  const complementIndex = binarySearch(input, expectedSum - value, i + 1, n - 1)

  if (complementIndex !== -1) {
    console.log('result', value, '+', input[complementIndex]);
  }
}

console.timeEnd('findSums');
