import { wordBreak } from './break_words_dict.ts';

const input = 'wordseandoneseaanddelta';
const wordDict =  [
  'and',
  'delta',
  'done',
  'sea',
  'sean',
  'word',
  'words',
];

const result = wordBreak(input, wordDict);

console.log({input, wordDict, result});
