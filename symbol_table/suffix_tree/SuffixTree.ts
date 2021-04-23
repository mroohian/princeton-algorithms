interface TrieNode {
  start: number;
  length: number;
  value?: number;
  children: Record<string, TrieNode>;
}

interface MatchingNode {
  node: TrieNode;
  position: number;
}

const START_CHAR = '\u0001';
const END_CHAR = '\u0000';

export class SuffixTree {
  #chars: string[];
  #root: TrieNode;

  public get length(): number {
    return this.#chars.length;
  }

  public get debugData(): TrieNode {
    return this.#root;
  }

  public constructor(word: string) {
    this.#chars = [START_CHAR, ...word, END_CHAR];
    this.#root = { start: 0, length: 0, children: {} };

    this.fillTree();
  }

  private addSuffix(start: number): void {
    let node = this.#root;

    let position = start;
    while (position < this.length) {
      const char = this.#chars[position];
      const child = node.children[char];

      if (child === undefined) {
        node.children[char] = { start: position, length: this.length - position, value: start - 1, children: {} };
        return;
      }

      let matchCounter = 1;
      while (
        matchCounter < child.length &&
        this.#chars[child.start + matchCounter] === this.#chars[position + matchCounter]
      ) {
        matchCounter++;
      }

      if (matchCounter === child.length) {
        position += matchCounter;
        node = child;
        continue;
      }

      const splitPosition = child.start + matchCounter;
      const remainingPosition = position + matchCounter;

      const existingChar = this.#chars[splitPosition];
      const newChar = this.#chars[remainingPosition];

      const middleNode: TrieNode = {
        start: child.start,
        length: matchCounter,
        children: {},
      };

      middleNode.children[newChar] = {
        start: remainingPosition,
        length: this.length - remainingPosition,
        value: start - 1,
        children: {},
      };

      child.start = splitPosition;
      child.length = child.length - matchCounter;
      middleNode.children[existingChar] = child;

      node.children[char] = middleNode;
      break;
    }
  }

  private fillTree(): void {
    const char = this.#chars[0];
    this.#root.children[char] = { start: 0, length: this.length, value: 0, children: {} };

    for (let start = 1; start < this.length; start++) {
      this.addSuffix(start);
    }
  }

  private getWordChars(word: string): string[] {
    if (word.includes(START_CHAR) || word.includes(END_CHAR)) {
      throw new Error(`Invalid input ${word}`);
    }

    return [...word];
  }

  private getMatchingNode(wordChars: string[]): MatchingNode | undefined {
    let node = this.#root;

    let position = 0;
    while (position < wordChars.length) {
      const char = wordChars[position++];
      const child = node.children[char];

      if (child === undefined) {
        return undefined;
      }

      let matchCounter = 1;
      while (matchCounter < child.length &&
        this.#chars[child.start + matchCounter] === wordChars[position]) {
        matchCounter++;
        position++;
      }

      if (position === wordChars.length) {
        return { node: child, position: matchCounter };
      }

      if (matchCounter !== child.length) {
        return undefined;
      }

      node = child;
    }

    return { node, position: node.length };
  }

  public contains(word: string): boolean {
    if (word === undefined || word.length === 0) {
      return true;
    }

    const nodeMatch = this.getMatchingNode(this.getWordChars(word));

    return nodeMatch !== undefined;
  }

  public startsWith(word: string): boolean {
    if (word === undefined || word.length === 0) {
      return true;
    }

    const wordChars = [START_CHAR, ...this.getWordChars(word)];

    const nodeMatch = this.getMatchingNode(wordChars);

    return nodeMatch !== undefined;
  }

  public endsWith(word: string): boolean {
    if (word === undefined || word.length === 0) {
      return true;
    }

    const wordChars = [...this.getWordChars(word), END_CHAR];

    const nodeMatch = this.getMatchingNode(wordChars);

    return nodeMatch !== undefined;
  }

  public indexOf(word: string): number[] {
    if (word === undefined || word.length === 0) {
      return [];
    }

    const nodeMatch = this.getMatchingNode(this.getWordChars(word));
    if (nodeMatch === undefined) {
      return [];
    }

    // DFS from the matching node
    const stack = [nodeMatch.node];
    const indices: number[] = [];
    while (stack.length > 0) {
      const node = stack.pop() as TrieNode;

      if (node.value !== undefined) {
        indices.push(node.value);
      }

      stack.push(...Object.values(node.children));
    }

    return indices.sort((a, b) => a - b);
  }
}
