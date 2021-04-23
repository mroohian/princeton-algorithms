class Tower {
  readonly #items: number[] = [];

  public get top(): number {
    return this.#items[this.#items.length - 1] ?? 0;
  }

  public get size(): number {
    return this.#items.length;
  }

  public get isEmpty(): boolean {
    return this.#items.length === 0;
  }

  public get items(): number[] {
    return [...this.#items];
  }

  public constructor(n = 0) {
    this.#items =
      n === 0 ? [] : [...Array(n).keys()].map((i) => i + 1).reverse();
  }

  public put(item: number): void {
    if (!this.isEmpty && item > this.top) {
      throw new Error('Cannot move bigger item to the top.');
    }

    this.#items.push(item);
  }

  public take(): number {
    if (this.size === 0) {
      throw new Error('Cannot remove an item from empty tower.');
    }

    return this.#items.pop() as number;
  }
}

function moveTop(source: Tower, destination: Tower): void {
  destination.put(source.take());
}

function moveDisks(
  n: number,
  source: Tower,
  buffer: Tower,
  destination: Tower,
  displayFn: () => void
): void {
  if (n <= 0) {
    return;
  }

  moveDisks(n - 1, source, destination, buffer, displayFn);
  moveTop(source, destination);
  displayFn();
  moveDisks(n - 1, buffer, source, destination, displayFn);
}

export function towersOfHanoi(n: number): void {
  if (n <= 0) {
    return;
  }

  const source = new Tower(n);
  const buffer = new Tower();
  const destination = new Tower();

  const displayFn = () => {
    console.log(source.items, buffer.items, destination.items);
  };

  displayFn();
  moveDisks(n, source, buffer, destination, displayFn);
}
