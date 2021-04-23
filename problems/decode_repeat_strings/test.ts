import { decodeRepeatStrings } from "./decode_repeat_strings.ts";

const input = 'aa3[a2[b]]';

const result = decodeRepeatStrings(input);

console.log({
  input,
  result,
})
