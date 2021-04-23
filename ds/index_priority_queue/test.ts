import { IndexPriorityQueue } from './IndexPriorityQueue.ts';
import { generateData } from '../../data/generateData.ts';

const input = generateData(10, 0, 20, true);

console.log(input);

const indexedPriorityQueue = new IndexPriorityQueue<number>();

for (const [index, value] of input.entries()) {
  indexedPriorityQueue.insert(index, value);
}

indexedPriorityQueue.promote(0, 50);
indexedPriorityQueue.demote(1, -50);
indexedPriorityQueue.remove(3);

while (!indexedPriorityQueue.isEmpty) {
  console.log(indexedPriorityQueue.pop());
}
