
const { args } = Deno;

import { generateDataSorted } from '../../data/generateData.ts';
import { BST } from '../../symbol_table/binary_search_tree/binary_search_tree.ts';

const n = parseInt(args[0] ?? '0', 10);
const min = parseInt(args[1] ?? '0', 10);
const max = parseInt(args[2] ?? '0', 10) || 100;
const input = generateDataSorted(n, min, max, true);

console.log('input', input);

const bst = new BST<number, number>();

let order = 0;

function addSection(start: number, end: number): void {
  if (start > end) {
    return;
  }

  const middle = Math.trunc((end + start) / 2);

  bst.put(input[middle], order++);

  addSection(start, middle - 1);
  addSection(middle + 1, end);
}

addSection(0, input.length - 1)

console.log('result', JSON.stringify(bst.debugData, null, 2));

console.log('# pre order:');
for (const key of bst.keysPreOrder()) {
  console.log('key:', key);
}
