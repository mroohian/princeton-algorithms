const { args } = Deno;

import { powersOfTwo } from './powers_of_two.ts';

const n = parseInt(args[0] ?? '0', 10);

const result = powersOfTwo(n);

console.log('result', result);