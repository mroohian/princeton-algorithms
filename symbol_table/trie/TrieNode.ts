export class TrieNode<Value> {
  #children: Record<string, TrieNode<Value>> = {};
  public readonly values = new Set<Value>();

  public get children(): TrieNode<Value>[] {
    return Object.values(this.#children);
  }


  public get isEmpty(): boolean {
    return this.values.size === 0;
  }

  public constructor(public readonly keyChar: string) {}


  public findChild(keyChar: string): TrieNode<Value> | undefined {
    return this.#children[keyChar];
  }

  public appendChild(child: TrieNode<Value>): void {
    this.#children[child.keyChar] = child;
  }
}
