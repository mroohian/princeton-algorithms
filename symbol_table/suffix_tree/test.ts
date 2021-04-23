const { args } = Deno;

import { SuffixTree } from './SuffixTree.ts';

const input = args[0] ?? 'abaaba';
const query = args[1] ?? 'baab';

console.log('input', input);
console.log('query', query);

const suffixTree = new SuffixTree(input);

// console.log(JSON.stringify(suffixTree.debugData, null, 2));

console.log(`contains(${query})`, suffixTree.contains(query));

console.log(`startsWith(${query})`, suffixTree.startsWith(query));

console.log(`endsWith(${query})`, suffixTree.endsWith(query));

console.log(`indexOf(${query})`, suffixTree.indexOf(query));
