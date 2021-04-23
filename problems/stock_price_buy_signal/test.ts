const { args } = Deno;

import { generateData } from '../../data/generateData.ts';
import { stockPriceBuySignal } from './stock_price_buy_signal.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateData(n, min, max, false);

console.log('input', input);

const profit = stockPriceBuySignal(input);

console.log('output', profit);
