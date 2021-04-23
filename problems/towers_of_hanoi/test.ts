
const { args } = Deno;

import { towersOfHanoi } from './towers_of_hanoi.ts';

const n = parseInt(args[0] ?? '0', 10);

towersOfHanoi(n);
