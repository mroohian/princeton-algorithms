const { args } = Deno;

import { fibonacci } from './fibonacci.ts';

const n = parseInt(args[0] ?? '0', 10);

const result = fibonacci(n);

console.log('result', result);