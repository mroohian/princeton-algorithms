const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { lsdRadixSort } from './lsd_radix_sort.ts';

const n = parseInt(args[0] ?? '0', 10);
const length = parseInt(args[1] ?? '0', 10);
const min = 'a'.charCodeAt(0);
const max = 'z'.charCodeAt(0);

const input = [...Array(n)].map(() =>
  String.fromCharCode(...generateData(length, min, max, false))
);

console.log('input', input);

console.log('result', lsdRadixSort(length, input, min, max));

