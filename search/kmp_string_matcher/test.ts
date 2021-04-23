import { StringMatcherKMP } from './StringMatcherKMP.ts';

// const text = 'this is a test sentence';
// const query = 'test';

const text = 'aabacbaababacbbca';
const query = 'ababac';

console.log('text', text);
console.log('query', query);

const stringMatcher = new StringMatcherKMP(query);

const result = stringMatcher.stringIndexOf(text);

console.log('result:', result);
if (result !== -1) {
  // Example: aabacba ababac bbca
  console.log(
    `${text.substring(0, result)}%c${text.substring(
      result,
      result + query.length
    )}%c${text.substring(result + query.length)}`,
    'color:red',
    'color:initial'
  );
}
