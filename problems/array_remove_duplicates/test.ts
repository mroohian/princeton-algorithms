const { args } = Deno;

import { generateDataSorted } from '../../data/generateData.ts';
import { arrayRemoveDuplicates } from './array_remove_duplicates.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateDataSorted(n, min, max, false);

console.log('input', input);

const length = arrayRemoveDuplicates(input);

console.log('output', input);

console.log('new length', length);