
const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { mergeSort } from '../merge_sort/merge_sort.ts';
import { mergeSortBottomUp } from './merge_sort_bottom_up.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateData(n, min, max, true);


console.log('input', input);

console.time('100000x mergeSortBottomUp');

for (let x = 0; x < 100000; x++) {
  mergeSortBottomUp([...input]);
}

console.timeEnd('100000x mergeSortBottomUp');

console.time('100000x mergeSort');

for (let x = 0; x < 100000; x++) {
  mergeSort([...input]);
}

console.timeEnd('100000x mergeSort');
