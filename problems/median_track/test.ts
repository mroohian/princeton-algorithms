const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { MedianTracker } from './MedianTracker.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;

const input = generateData(n, min, max, true);

console.log('input', input);

const medianTracker = new MedianTracker();

for (const value of input) {
  medianTracker.add(value);
}

const result = medianTracker.median();

console.log('result', result);