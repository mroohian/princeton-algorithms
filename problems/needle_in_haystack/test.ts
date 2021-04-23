import { findNeedleInHaystack } from './needle_in_haystack.ts';

const needle = 'ld';
const haystack = 'hello world!';

const result = findNeedleInHaystack(haystack, needle);

console.log({
  needle,
  haystack,
  result,
});
