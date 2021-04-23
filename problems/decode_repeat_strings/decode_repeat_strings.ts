const isDigit = (c: string): boolean => c >= '0' && c <= '9';

export function decodeRepeatStrings(s: string): string {
  let output = "";

  const repeats: number[] = [];
  const outputStrings: string[] = [];

  let repeat = "";
  for (const c of s) {
    if (isDigit(c)) {
      repeat += c;
    } else if (c === "[") {
      repeats.push(parseInt(repeat, 10));
      repeat = "";

      outputStrings.push(output);
      output = "";
    } else if (c === "]") {
      output = outputStrings.pop() + output.repeat(repeats.pop() as number);
    } else {
      output += c;
    }
  }

  return output;
}
