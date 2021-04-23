export class Queue<Item = any> implements Iterable<Item> {
  #queue: Item[] = [];
  #offset = 0;

  public get length(): number {
    return this.#queue.length - this.#offset;
  }

  public get isEmpty(): boolean {
    return this.#queue.length === 0;
  }

  public peek(): Item | undefined {
    return this.isEmpty ? undefined : this.#queue[this.#offset];
  }

  public enqueue(...item: Item[]): void {
    this.#queue.push(...item);
  }

  public dequeue(): Item | undefined {
    if (this.isEmpty) {
       return undefined;
    }

    const item = this.#queue[this.#offset++];

    if (this.#offset * 2 >= this.#queue.length){
      this.#queue  = this.#queue.slice(this.#offset);
      this.#offset = 0;
    }

    return item;
  }

  public *items(reverse = false): Generator<Item> {
    const start = this.#offset;
    const end = this.length - 1;

    if (reverse) {
      for (let index = end; index >= start; index--) {
        yield this.#queue[index];
      }
    } else {
      for (let index = start; index <= end; index++) {
        yield this.#queue[index];
      }
    }
  }

  public [Symbol.iterator](): Iterator<Item> {
    return this.items();
  }
}
