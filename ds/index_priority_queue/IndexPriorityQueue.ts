import { Comparator, DefaultMaxComparator } from '../comparator/Comparator.ts';

export class IndexPriorityQueue<Item = any> {
  #heap: number[];
  #positionMap: (number | undefined)[];
  #values: (Item | undefined)[];
  #comparator: Comparator<Item>;

  public get size(): number {
    return this.#heap.length;
  }

  get isEmpty(): boolean {
    return this.size == 0;
  }

  public constructor(comparator: Comparator<Item> = DefaultMaxComparator) {
    this.#heap = [];
    this.#positionMap = [];
    this.#values = [];
    this.#comparator = comparator;
  }

  private swap(index1: number, index2: number): void {
    // update position map
    this.#positionMap[this.#heap[index1]] = index2;
    this.#positionMap[this.#heap[index2]] = index1;

    // swap
    [this.#heap[index1], this.#heap[index2]] = [this.#heap[index2], this.#heap[index1]];
  }

  private swimUp(index: number): void {
    if (index < 0 || index >= this.#heap.length) {
      return;
    }

    while (index > 0) {
      const parentIndex = ((index + 1) >>> 1) - 1;
      if (
        this.#comparator.compare(
          this.#values[this.#heap[parentIndex]] as Item,
          this.#values[this.#heap[index]] as Item
        ) > 0
      ) {
        break;
      }

      this.swap(parentIndex, index);

      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    if (index < 0 || index >= this.#heap.length) {
      return;
    }

    while (true) {
      const leftIndex = (index << 1) + 1;
      if (leftIndex >= this.#heap.length) {
        break;
      }

      const rightIndex = leftIndex + 1;

      const childIndex =
        rightIndex < this.#heap.length &&
        this.#comparator.compare(
          this.#values[this.#heap[rightIndex]] as Item,
          this.#values[this.#heap[leftIndex]] as Item
        ) > 0
          ? rightIndex
          : leftIndex;

      if (
        this.#comparator.compare(
          this.#values[this.#heap[index]] as Item,
          this.#values[this.#heap[childIndex]] as Item
        ) > 0
      ) {
        break;
      }

      this.swap(index, childIndex);

      index = childIndex;
    }
  }

  public contains(index: number): boolean {
    if (index < 0) {
      throw new Error(`Invalid index: ${index}`);
    }

    return this.#positionMap[index] !== undefined;
  }

  public insert(index: number, value: Item): void {
    if (index < 0) {
      throw new Error(`Invalid index: ${index}`);
    }

    if (this.contains(index)) {
      throw new Error(`Index : ${index} already exists`);
    }

    this.#heap.push(index);
    const heapPosition = this.#heap.length - 1;

    this.#positionMap[index] = heapPosition;
    this.#values[index] = value;
    this.swimUp(heapPosition);
  }

  public update(index: number, value: Item): void {
    if (index < 0) {
      throw new Error(`Invalid index: ${index}`);
    }

    if (!this.contains(index)) {
      throw new Error(`Index: ${index} does not exists`);
    }

    const heapPosition = this.#positionMap[index];

    if (heapPosition === undefined) {
      throw new Error(`Link to the position index: ${index} does not exists`);
    }

    this.#values[index] = value;
    this.swimUp(heapPosition);
    this.sinkDown(heapPosition);
  }

  public promote(index: number, value: Item): void {
    if (index < 0) {
      throw new Error(`Invalid index: ${index}`);
    }

    if (!this.contains(index)) {
      throw new Error(`Index: ${index} does not exists`);
    }

    const heapPosition = this.#positionMap[index];

    if (heapPosition === undefined) {
      throw new Error(`Link to the position index: ${index} does not exists`);
    }

    const currentValue = this.#values[index] as Item;
    const result = this.#comparator.compare(currentValue, value);
    if (result >= 0) {
      throw new Error(`Current value ${currentValue} is equal or more than: ${value}`);
    }

    this.#values[index] = value;
    this.swimUp(heapPosition);
  }

  public demote(index: number, value: Item): void {
    if (index < 0) {
      throw new Error(`Invalid index: ${index}`);
    }

    if (!this.contains(index)) {
      throw new Error(`Index: ${index} does not exists`);
    }

    const heapPosition = this.#positionMap[index];

    if (heapPosition === undefined) {
      throw new Error(`Link to the position index: ${index} does not exists`);
    }

    const currentValue = this.#values[index] as Item;
    const result = this.#comparator.compare(currentValue, value);
    if (result <= 0) {
      throw new Error(`Current value ${currentValue} is equal or less than: ${value}`);
    }

    this.#values[index] = value;
    this.sinkDown(heapPosition);
  }

  public remove(index: number): Item | undefined {
    if (index < 0) {
      throw new Error(`Invalid index: ${index}`);
    }

    if (!this.contains(index)) {
      throw new Error(`Index: ${index} does not exists`);
    }

    const heapPosition = this.#positionMap[index];

    if (heapPosition === undefined) {
      throw new Error(`Link to the position index: ${index} does not exists`);
    }

    if (heapPosition < this.#heap.length - 1) {
      this.swap(heapPosition, this.#heap.length - 1);
    }

    const value = this.#values[index];

    this.#positionMap[index] = undefined;
    this.#values[index] = undefined;
    this.#heap.pop();

    this.sinkDown(heapPosition);
    this.swimUp(heapPosition);

    return value;
  }

  public pop(): Item | undefined {
    const index = this.minIndex();

    if (index === undefined) {
      return undefined;
    }

    if (this.#heap.length > 1) {
      this.swap(0, this.#heap.length - 1);
    }

    const value = this.#values[index];

    this.#positionMap[index] = undefined;
    this.#values[index] = undefined;
    this.#heap.pop();

    this.sinkDown(0);

    return value;
  }

  public minIndex(): number | undefined {
    return this.#heap[0];
  }

  public peek(): Item | undefined {
    return this.#values[this.#heap[0]];
  }

  public get(index: number): Item | undefined {
    if (index < 0) {
      throw new Error(`Invalid index: ${index}`);
    }

    return this.#values[index];
  }
}
