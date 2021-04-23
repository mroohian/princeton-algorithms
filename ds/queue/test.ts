import { Queue } from './Queue.ts';

const values = [...Array(6).keys()];

const queue = new Queue();

for (const i of values) {
  queue.enqueue(i);
}

for (const i of queue) {
  console.log('--', i);
}

while (!queue.isEmpty) {
  console.log(queue.dequeue());
}
