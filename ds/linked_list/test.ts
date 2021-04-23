import { LinkedList } from './LinkedList.ts';

const values = [...Array(6).keys()];

const linkedList = new LinkedList();

for (const i of values) {
  linkedList.push(i);
}

linkedList.reverse();

for (const i of linkedList) {
  console.log('--', i);
}

while (!linkedList.isEmpty) {
  console.log(linkedList.pop());
}
