const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { knapsack, Item } from './knapsack.ts';

const n = parseInt(args[0] ?? '0', 10);
const weights = generateData(n, 4, 8);
const values = generateData(n, 50, 100);

const items = weights.map((weight, index): Item => ({ weight, value: values[index] }));

const capacity = generateData(1, 10, 15)[0];

console.log('items', items);
console.log('capacity', capacity);

const result = knapsack(items, capacity);

console.log('result', result);
