const { args } = Deno;

import { prime } from './prime.ts';
import { sieveOfEratosthenes } from './sieve_of_eratosthenes.ts';

const n = parseInt(args[0] ?? '0', 10);

const values = [...Array(n).keys()];

console.time(`${n}x prime`);

const results = [];
for (const value of values) {
  const result = prime(value);

  if (result) {
    results.push(value);
  }
}

console.timeEnd(`${n}x prime`);

console.log(results, 'last:', results[results.length - 1]);
console.log(results.length);

console.time(`${n}x Sieve Of Eratosthenes`);

const results1 = sieveOfEratosthenes(n);

console.timeEnd(`${n}x Sieve Of Eratosthenes`);

console.log(results1, 'last:', results1[results1.length - 1]);
console.log(results1.length);