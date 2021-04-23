import { findNeedleInHaystack } from './knuth-morris-pratt.ts';

const needle = 'ld';
const haystack = 'hello world!';

const result = findNeedleInHaystack(haystack, needle);

console.log({
  needle,
  haystack,
  result,
});
