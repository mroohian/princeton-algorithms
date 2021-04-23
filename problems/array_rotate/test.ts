const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { arrayRotate } from './array_rotate.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = [1, 2] // generateData(n, min, max, false);

const rotateAmount = 3 // generateData(1, 1, 4)[0];

console.log('input', input);
console.log('rotateAmount', rotateAmount);

arrayRotate(input, rotateAmount);

console.log('output', input);
