class LinkedListNode<Item> {
  public next: LinkedListNode<Item> | undefined;

  public constructor(public readonly value: Item, next: LinkedListNode<Item> | undefined = undefined) {
    this.next = next;
  }
}

export class LinkedList<Item = any> implements Iterable<Item> {
  #head: LinkedListNode<Item> | undefined;

  public get isEmpty(): boolean {
    return this.#head === undefined;
  }

  private *items(): Generator<Item> {
    if (this.isEmpty) {
      return;
    }

    let node = this.#head;

    while (node !== undefined) {
      yield node.value;

      node = node.next;
    }
  }

  public push(...values: Item[]): void {
    for (const value of values) {
      this.#head = new LinkedListNode<Item>(value, this.#head);
    }
  }

  public pop(): Item | undefined {
    if (this.isEmpty) {
      return undefined;
    }

    const node = this.#head as LinkedListNode<Item>;

    this.#head = node.next;

    return node.value;
  }

  public reverse(): void {
    if (this.isEmpty) {
      return;
    }

    let previous: LinkedListNode<Item> | undefined;
    let node = this.#head;

    while (node !== undefined) {
      const next = node.next;
      node.next = previous;
      previous = node;
      node = next;
    }

    this.#head = previous;
  }

  public [Symbol.iterator](): Iterator<Item> {
    return this.items();
  }
}
