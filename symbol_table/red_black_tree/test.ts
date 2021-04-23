import { RedBlackTree, printTree } from './red_black_tree.ts';

const rbt = new RedBlackTree<string, number>();

rbt.put('S', 0);
rbt.put('E', 1);
rbt.put('A', 2);
rbt.put('R', 3);
rbt.put('H', 4);
rbt.put('C', 5);
rbt.put('M', 6);
rbt.put('X', 7);
rbt.put('O', 8);
console.log(rbt.debugData);
printTree(rbt);

rbt.put('C', 55);
rbt.put('X', 77);

rbt.delete('R');
rbt.delete('E');

console.log('size', rbt.size);

console.log('# in order:');
for (const key of rbt.keys()) {
  console.log('key:', key);
}

console.log('# pre order:');
for (const key of rbt.keysPreOrder()) {
  console.log('key:', key);
}

console.log('# post order:');
for (const key of rbt.keysPostOrder()) {
  console.log('key:', key);
}

console.log('C', rbt.get('C'));
console.log('X', rbt.get('X'));

console.log('minKey', rbt.minKey());
console.log('maxKey', rbt.maxKey());

// console.log(JSON.stringify(rbt.debugData, null, 2));

console.log('floorKey(G)', rbt.floorKey('G'));
console.log('floorKey(B)', rbt.floorKey('B'));

console.log('ceilingKey(B)', rbt.ceilingKey('B'));
console.log('ceilingKey(F)', rbt.ceilingKey('F'));
console.log('ceilingKey(T)', rbt.ceilingKey('T'));

console.log('rank(R)', rbt.rank('R'));
console.log('rank(R)', rbt.rank('S'));
