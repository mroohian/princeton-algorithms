const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { msd3WayQuickSort } from './msd_3way_quick_sort.ts';

const n = parseInt(args[0] ?? '0', 10);
const minLength = parseInt(args[1] ?? '0', 10);
const maxLength = parseInt(args[2] ?? '0', 10);
const min = 'a'.charCodeAt(0);
const max = 'z'.charCodeAt(0);

const input = [...Array(n)].map(() => {
  const length = generateData(1, minLength, maxLength)[0];
  return String.fromCharCode(...generateData(length, min, max, false))
});

console.log('input', input);

console.log('result', msd3WayQuickSort(input));
