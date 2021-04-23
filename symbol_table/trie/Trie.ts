import { TrieNode } from './TrieNode.ts';

export class Trie<Value> {
  #root: TrieNode<Value>;

  public get keys(): Generator<string> {
    return this.keysGenerator('');
  }

  public get values(): Generator<Value> {
    return this.valuesGenerator();
  }

  public get entries(): Generator<[string, Value[]]> {
    return this.entriesGenerator('');
  }

  public constructor() {
    this.#root = new TrieNode<Value>('');
  }

  private *collectKeys(node: TrieNode<Value>, prefix: string): Generator<string> {
    if (node === undefined) {
      return;
    }

    if (!node.isEmpty) {
      yield prefix;
    }

    for (const child of node.children) {
      yield* this.collectKeys(child, prefix + child.keyChar);
    }
  };

  private *keysGenerator(prefix: string): Generator<string> {
    const node = prefix === '' ? this.#root : this.get(prefix);

    if (node === undefined) {
      return;
    }

    yield* this.collectKeys(node, prefix);
  }

  private *collectValues(node: TrieNode<Value>): Generator<Value, any, undefined> {
    if (node === undefined) {
      return;
    }

    if (!node.isEmpty) {
      yield* node.values;
    }

    for (const child of node.children) {
      yield* this.collectValues(child);
    }
  };

  private *valuesGenerator(): Generator<Value, any, undefined> {
    yield* this.collectValues(this.#root);
  }

  private *collectEntries(node: TrieNode<Value>, prefix: string): Generator<[string, Value[]]> {
    if (node === undefined) {
      return;
    }

    if (!node.isEmpty) {
      yield [prefix, Array.from(node.values)];
    }

    for (const child of node.children) {
      yield* this.collectEntries(child, prefix + child.keyChar);
    }
  };

  private *entriesGenerator(prefix: string): Generator<[string, Value[]]> {
    const node = prefix === '' ? this.#root : this.get(prefix);

    if (node === undefined) {
      return;
    }

    yield* this.collectEntries(node, prefix);
  }

  public *keysWithPrefix(prefix: string): Generator<string> {
    yield* this.keysGenerator(prefix);
  }

  public get(prefix: string): TrieNode<Value> | undefined {
    let current = this.#root;

    for (const keyChar of prefix) {
      const child = current.findChild(keyChar);

      if (child === undefined) {
        return undefined;
      }

      current = child;
    }

    return current;
  }

  public addWord(word: string, value: Value): TrieNode<Value> {
    let current = this.#root;

    for (const keyChar of word) {
      const child = current.findChild(keyChar);

      if (child !== undefined) {
        current = child;
        continue;
      }

      const newChild = new TrieNode<Value>(keyChar);
      current.appendChild(newChild);
      current = newChild;
    }

    if (!current.values.has(value)) {
      current.values.add(value);
    }

    return current;
  }
}
