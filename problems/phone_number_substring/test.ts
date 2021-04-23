import { Trie } from '../../symbol_table/trie/Trie.ts';

const words = ['for', 'bar', 'baz', 'foobar', 'emo', 'cap', 'car', 'cat'];

const charNumberMap: Record<string, string> = {};
for (const [chars, value] of [
  ['abc', '2'],
  ['def', '3'],
  ['ghi', '4'],
  ['jkl', '5'],
  ['mno', '6'],
  ['pqrs', '7'],
  ['tuv', '8'],
  ['wxyz', '9'],
] as [string, string][]) {
  for (const char of chars) {
    charNumberMap[char] = value;
  }
}

const toDigits = (value: string): string => {
  return [...value].map((x) => charNumberMap[x]).join('');
};

const trie = new Trie<string>();
for (const word of words) {
  trie.addWord(toDigits(word), word);
}

console.log('# entries:');
for (const [key, values] of trie.entries) {
  console.log(key, '=', values);
}
