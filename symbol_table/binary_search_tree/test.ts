import { BST } from './binary_search_tree.ts';

const bst = new BST<string, number>();

bst.put('S', 0);
bst.put('E', 1);
bst.put('A', 2);
bst.put('R', 3);
bst.put('H', 4);
bst.put('C', 5);
bst.put('M', 6);
bst.put('X', 7);

bst.put('C', 55);
bst.put('X', 77);

bst.delete('R');
bst.delete('E');

console.log('size', bst.size);

console.log('# in order:');
for (const key of bst.keys()) {
  console.log('key:', key);
}

console.log('# pre order:');
for (const key of bst.keysPreOrder()) {
  console.log('key:', key);
}

console.log('# post order:');
for (const key of bst.keysPostOrder()) {
  console.log('key:', key);
}

console.log('C', bst.get('C'));
console.log('X', bst.get('X'));

console.log('minKey', bst.minKey());
console.log('maxKey', bst.maxKey());

// console.log(JSON.stringify(bst.debugData, null, 2));

console.log('floorKey(G)', bst.floorKey('G'));
console.log('floorKey(B)', bst.floorKey('B'));

console.log('ceilingKey(B)', bst.ceilingKey('B'));
console.log('ceilingKey(F)', bst.ceilingKey('F'));
console.log('ceilingKey(T)', bst.ceilingKey('T'));

console.log('rank(R)', bst.rank('R'));
console.log('rank(R)', bst.rank('S'));
