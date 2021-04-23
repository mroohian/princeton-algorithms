import { PriorityQueue } from './PriorityQueue.ts';
import { generateData } from '../../data/generateData.ts';

const input = generateData(10, 0, 20, true);

console.log(input);

const priorityQueue = new PriorityQueue();

for (const i of input) {
  priorityQueue.push(i);
}

while (!priorityQueue.isEmpty) {
  console.log(priorityQueue.pop());
}
