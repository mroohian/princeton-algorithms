const { args } = Deno;

import { prime } from './prime.ts';

const n = parseInt(args[0] ?? '0', 10);

const result = prime(n);

console.log('result', result);