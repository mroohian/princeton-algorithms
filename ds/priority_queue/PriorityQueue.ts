import { Comparator, DefaultMaxComparator } from '../comparator/Comparator.ts';

export class PriorityQueue<Item = any> {
  #heap: Item[];
  #comparator: Comparator<Item>;

  public get size(): number {
    return this.#heap.length;
  }

  get isEmpty(): boolean {
    return this.size == 0;
  }

  public constructor(comparator: Comparator<Item> = DefaultMaxComparator) {
    this.#heap = [];
    this.#comparator = comparator;
  }

  private swimUp(index: number): void {
    while (index > 0) {
      const parentIndex = ((index + 1) >>> 1) - 1;
      if (
        this.#comparator.compare(
          this.#heap[parentIndex],
          this.#heap[index]
        ) > 0
      ) {
        break;
      }

      // swap
      [this.#heap[parentIndex], this.#heap[index]] = [this.#heap[index], this.#heap[parentIndex]];

      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    while (true) {
      const leftIndex = (index << 1) + 1;
      if (leftIndex >= this.#heap.length) {
        break;
      }

      const rightIndex = leftIndex + 1;

      const childIndex =
        rightIndex < this.#heap.length &&
        this.#comparator.compare(
          this.#heap[rightIndex],
          this.#heap[leftIndex]
        ) > 0
          ? rightIndex
          : leftIndex;

      if (
        this.#comparator.compare(
          this.#heap[index],
          this.#heap[childIndex]
        ) > 0
      ) {
        break;
      }

      // swap
      [this.#heap[index], this.#heap[childIndex]] = [this.#heap[childIndex], this.#heap[index]];

      index = childIndex;
    }
  }

  public push(...values: Item[]): void {
    for (const value of values) {
      this.#heap.push(value);
      this.swimUp(this.#heap.length - 1);
    }
  }

  public peek(): Item {
    return this.#heap[0];
  }

  public pop(): Item {
    const value = this.peek();

    if (this.#heap.length > 1) {
      // swap
      [this.#heap[0], this.#heap[this.#heap.length - 1]] = [this.#heap[this.#heap.length - 1], this.#heap[0]];
    }

    this.#heap.pop();
    this.sinkDown(0);

    return value;
  }
}
