
const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { quickSort } from './quick_sort_debug.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateData(n, min, max, true);

console.log('input', input);

const result = quickSort([...input]);

console.log('result', result);