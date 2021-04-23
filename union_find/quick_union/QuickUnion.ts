export class QuickUnion {
  readonly #n: number;
  readonly #id: number[];
  readonly #ccSize: number[];

  public get length(): number {
    return this.#n;
  }

  public constructor(n: number) {
    this.#n = n;
    this.#id = [...Array(n).keys()];
    this.#ccSize = new Array(n).fill(1);
  }

  private root(item: number): number {
    while (item != this.#id[item]) {
      const parentItem = this.#id[this.#id[item]];
      // TODO: fix the weights
      this.#id[item] = parentItem;
      item = parentItem;
    }

    return item;
  }

  public connected(item1: number, item2: number): boolean {
    const root1 = this.root(item1);
    const root2 = this.root(item2);

    return root1 === root2;
  }

  public union(item1: number, item2: number): void {
    const root1 = this.root(item1);
    const root2 = this.root(item2);

    if (root1 === root2) {
      return;
    }

    const size1 = this.#ccSize[root1];
    const size2 = this.#ccSize[root2];
    if (size1 < size2) {
      this.#id[root1] = root2;
      this.#ccSize[root2] += size1;
    } else {
      this.#id[root2] = root1;
      this.#ccSize[root1] += size2;
    }
  }
}
