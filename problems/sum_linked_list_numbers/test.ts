import {
  generateLinkedListNumber,
  sumLinkedListNumbers,
} from "./sum_linked_list_numbers.ts";

let a = generateLinkedListNumber([2, 4, 3]); // 342
let b = generateLinkedListNumber([5, 6, 4]); // 564

let result = sumLinkedListNumbers(a, b);

console.log({ a, b });
console.log(JSON.stringify(result, null, 2));

a = generateLinkedListNumber([5, 6, 9]); // 965
b = generateLinkedListNumber([5, 7, 9]); // 975

result = sumLinkedListNumbers(a, b); // 1940

console.log({ a, b });
console.log(JSON.stringify(result, null, 2));

a = generateLinkedListNumber([9, 9, 9]); // 999
b = generateLinkedListNumber([9, 9, 9]); // 999

result = sumLinkedListNumbers(a, b); // 1998

console.log({ a, b });
console.log(JSON.stringify(result, null, 2));


a = generateLinkedListNumber([9, 9, 9]); // 999
b = generateLinkedListNumber([1]); // 1

result = sumLinkedListNumbers(a, b); // 1000

console.log({ a, b });
console.log(JSON.stringify(result, null, 2));
