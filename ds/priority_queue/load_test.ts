import { PriorityQueue } from './PriorityQueue.ts';

const count = 500000;

const values = [...Array(count).keys()];

console.time(`${count}x priorityQueue push`);

const priorityQueue = new PriorityQueue();

for (const i of values) {
  priorityQueue.push(i);
}

console.timeEnd(`${count}x priorityQueue push`);

console.time(`${count}x priorityQueue pop`);

while (!priorityQueue.isEmpty) {
  priorityQueue.pop();
}

console.timeEnd(`${count}x priorityQueue pop`);
