import { Trie } from './Trie.ts';

const words = ['foo', 'bar', 'baz', 'foobar', 'emo', 'cap', 'car', 'cat'];

const trie = new Trie<string>();
for (const word of words) {
  trie.addWord(word, [...word].reverse().join(''));
}

console.log('# keys:');
for (const key of trie.keys) {
  console.log(key);
}

console.log('# keys prefix "ca":');
for (const key of trie.keysWithPrefix('ca')) {
  console.log(key);
}

console.log('# values:');
for (const value of trie.values) {
  console.log(value);
}

console.log('# entries:');
for (const [key, values] of trie.entries) {
  console.log(key, '=', values);
}
