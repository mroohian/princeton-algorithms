
const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { insertionSort } from './insertion_sort.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateData(n, min, max, true);

console.log('input', input);

console.log('result', insertionSort(input));