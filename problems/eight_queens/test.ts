
const { args } = Deno;

import { eightQueens } from './eight_queens.ts';

const boardSize = parseInt(args[0] ?? '8', 10);

const result = eightQueens(boardSize);

console.log('result', result);

console.log('#result', result.length);
