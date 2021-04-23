const { args } = Deno;

import { sqrt } from './sqrt.ts';

const n = parseInt(args[0] ?? '0', 10);

const result = sqrt(n);

console.log('result', result);