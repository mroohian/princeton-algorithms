
const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { mergeSort } from './merge_sort.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateData(n, min, max, true);

console.log('input', input);

console.time('50000x mergeSort');

for (let x = 0; x < 50000; x++) {
  mergeSort([...input]);
}

console.timeEnd('50000x mergeSort');

console.time('50000x sort');

for (let x = 0; x < 50000; x++) {
  [...input].sort();
}

console.timeEnd('50000x sort');
