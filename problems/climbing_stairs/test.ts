import { generateData } from '../../data/generateData.ts';
import { climbingStairs } from './climbing_stairs.ts';

const n = generateData(1, 4, 10)[0];

console.log('n', n);

const result = climbingStairs(n);

console.log('result', result);
