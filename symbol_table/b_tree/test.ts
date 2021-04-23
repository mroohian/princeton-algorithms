const { args } = Deno;

import { BTree } from './BTree.ts';

const order = parseInt(args[0] ?? '5', 10);

console.log('order', order);

const suffixTree = new BTree<number, number>(order);

suffixTree.put(1, 4);
suffixTree.put(3, 16);
suffixTree.put(2, 8);
suffixTree.put(6, 128);
suffixTree.put(4, 32);
suffixTree.put(5, 64);
suffixTree.put(7, 256);

console.log(JSON.stringify(suffixTree.debugData, null, 2));
