export class StringMatcherKMP {
  #nStates: number;
  #dfa: Record<string, number>[];

  public constructor(pattern: string) {
    this.#nStates = pattern.length;
    this.#dfa = this.buildDFA(pattern);
  }

  private buildDFA(pattern: string): Record<string, number>[] {
    const patternChars = [...pattern];
    const uniqueChars = new Set(patternChars);

    const dfa: Record<string, number>[] = patternChars.map((char, index) => ({
      [char]: index + 1,
    }));

    let prev = 0;
    for (let pos = 1; pos < patternChars.length; pos++) {
      const currentChar = patternChars[pos];

      for (const char of uniqueChars) {
        if (char !== currentChar) {
          const value = dfa[prev][char];
          if (value !== undefined) {
            dfa[pos][char] = value;
          }
        }
      }

      prev = dfa[prev][currentChar] ?? 0;
    }

    return dfa;
  }

  public stringIndexOf(input: string): number {
    let state = 0;
    let pos = 0;

    for (const char of input) {
      pos++;

      state = this.#dfa[state][char] ?? 0;

      if (state === this.#nStates) {
        break;
      }
    }

    if (state === this.#nStates) {
      return pos - state;
    }

    return -1;
  }
}
