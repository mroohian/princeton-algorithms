import { LinkedList } from './LinkedList.ts';

const count = 500000;

const reverseCount = 5000;

const values = [...Array(count).keys()];

console.time(`${count}x array push`);

const array = [];

for (const i of values) {
  array.push(i);
}

console.timeEnd(`${count}x array push`);

console.time(`${count}x array reverse`);

for (const _i of Array(reverseCount).keys()) {
  array.reverse();
}

console.timeEnd(`${count}x array reverse`);


console.time(`${count}x array pop`);

while (array.length) {
  array.pop();
}

console.timeEnd(`${count}x array pop`);

console.time(`${count}x linkedList push`);

const linkedList = new LinkedList();

for (const i of values) {
  linkedList.push(i);
}

console.timeEnd(`${count}x linkedList push`);

console.time(`${count}x linkedList reverse`);

for (const _i of Array(reverseCount).keys()) {
  linkedList.reverse();
}

console.timeEnd(`${count}x linkedList reverse`);


console.time(`${count}x linkedList pop`);

while (!linkedList.isEmpty) {
  linkedList.pop();
}

console.timeEnd(`${count}x linkedList pop`);
