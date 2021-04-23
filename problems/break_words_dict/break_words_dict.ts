function verifyBreak(
  word: string,
  wordDict: string[],
  maxWordLength: number,
  start: number,
  memo: boolean[]
): boolean {
  if (start === word.length) {
    return true;
  }

  if (memo[start] !== undefined) {
    return memo[start];
  }

  for (let end = start + 1; end <= word.length; end++) {
    if (end > start + maxWordLength) {
      break;
    }

    const guess = word.substring(start, end);
    if (
      wordDict.includes(guess) &&
      verifyBreak(word, wordDict, maxWordLength, end, memo)
    ) {
      memo[start] = true;
      return true;
    }
  }

  memo[start] = false;
  return false;
}

export function wordBreak(word: string, wordDict: string[]): boolean {
  const maxWordLength = Math.max(
    ...[...wordDict.values()].map((value) => value.length)
  );

  return verifyBreak(word, wordDict, maxWordLength, 0, []);
}
