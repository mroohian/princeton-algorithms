const { args } = Deno;

import { stringPermutation } from './string_permutation.ts';

const input = args[0] ?? '';

const result = stringPermutation(input);

console.log('result', result);