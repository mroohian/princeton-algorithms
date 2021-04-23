type KnuthMorrisPrattDfa = Record<string, number[]>;

function buildKnuthMorrisPrattDfa(needle: string): KnuthMorrisPrattDfa {
  const m = needle.length;

  const chars = new Set<string>([...needle]);

  const dfa: KnuthMorrisPrattDfa = {};

  for (const char of chars) {
    dfa[char] = new Array(m).fill(0);
  }

  dfa[needle[0]][0] = 1;

  for (let x = 0, i = 1; i < m; i++) {
    for (const char of chars) {
      dfa[char][i] = dfa[char][x];
    }

    const currentChar = needle[i];

    dfa[currentChar][i] = i + 1;

    x = dfa[currentChar][x];
  }

  return dfa;
}

export function findNeedleInHaystack(haystack: string, needle: string): number {
  const n = haystack.length;
  const m = needle.length;

  const dfa = buildKnuthMorrisPrattDfa(needle);

  let i = 0;
  let j = 0;
  for (; i < n && j < m; i++) {
    j = dfa[haystack[i]]?.[j] ?? 0;
  }

  if (j === m) {
    return i - m;
  }

  return -1;
}
