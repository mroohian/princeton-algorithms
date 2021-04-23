const { args } = Deno;

import { generateDataSorted, generateDataReverseSorted } from '../../data/generateData.ts';
import { bitonicMax } from './bitonic_max_logn.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;

const midIndex = Math.trunc(Math.random() * n);

const input = [
  ... ( midIndex === 0 ? [] : generateDataSorted(midIndex, min, max, true)),
  ... ( midIndex === n ? [] : generateDataReverseSorted(n - midIndex, min, max, true)),
];

console.log('input', input);
console.log('midIndex', midIndex);

const maxIndex = bitonicMax(input);

console.log('max value', input[maxIndex]);