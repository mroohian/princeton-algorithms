import { QuickUnion } from './QuickUnion.ts';

const quickUnion = new QuickUnion(10);

quickUnion.union(4, 3);
quickUnion.union(3, 8);
quickUnion.union(6, 5);
quickUnion.union(9, 4);
quickUnion.union(2, 1);
quickUnion.union(5, 0);
quickUnion.union(7, 2);
quickUnion.union(6, 1);
quickUnion.union(7, 3);

console.log('1 - 7', quickUnion.connected(1, 7));