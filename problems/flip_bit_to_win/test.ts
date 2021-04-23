
const { args } = Deno;

import { flipBitToWin1 } from './flip_bit_to_win.ts';

const input = parseInt(args[0] ?? '0', 10);

console.log('input', input);

const result = flipBitToWin1(input);

console.log('result', result);
