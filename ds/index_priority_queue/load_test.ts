import { IndexPriorityQueue } from './IndexPriorityQueue.ts';

const count = 500000;

const values = [...Array(count).keys()];

console.time(`${count}x indexPriorityQueue push`);

const indexPriorityQueue = new IndexPriorityQueue();

for (const [index, value] of values.entries()) {
  indexPriorityQueue.insert(index, value);
}

console.timeEnd(`${count}x indexPriorityQueue push`);

console.time(`${count}x indexPriorityQueue pop`);

while (!indexPriorityQueue.isEmpty) {
  indexPriorityQueue.pop();
}

console.timeEnd(`${count}x indexPriorityQueue pop`);
