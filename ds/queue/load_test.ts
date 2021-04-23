import { Queue } from './Queue.ts';

const count = 500000;

const values = [...Array(count).keys()];

console.time(`${count}x array push`);

const array = [];

for (const i of values) {
  array.push(i);
}

console.timeEnd(`${count}x array push`);

console.time(`${count}x array shift`);

while (array.length) {
  array.shift();
}

console.timeEnd(`${count}x array shift`);

console.time(`${count}x queue enqueue`);

const queue = new Queue();

for (const i of values) {
  queue.enqueue(i);
}

console.timeEnd(`${count}x queue enqueue`);

console.time(`${count}x queue dequeue`);

while (!queue.isEmpty) {
  queue.dequeue();
}

console.timeEnd(`${count}x queue dequeue`);
