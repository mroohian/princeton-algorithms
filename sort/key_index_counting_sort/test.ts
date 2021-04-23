
const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { keyIndexCountingSort } from './key_index_counting_sort.ts';

const n = parseInt(args[0] ?? '0', 10);
const maxKey = parseInt(args[1] ?? '0', 10);
const min = parseInt(args[2] ?? '0', 10);
const max = parseInt(args[3] ?? '0', 10) || 100;

const values =  generateData(n, min, max, false);
const keys = generateData(n, 0, maxKey, false);

const input = values.map((value, index): [number, number] => [value, keys[index]]);

console.log('input', input);

console.log('result', keyIndexCountingSort(n, maxKey, keys, values));
