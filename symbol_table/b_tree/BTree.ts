import { Comparator, DefaultMaxComparator } from '../../ds/comparator/Comparator.ts';

abstract class BTreeNode<Key> {
  protected keys: Key[];

  public get length(): number {
    return this.keys.length
  }

  protected get middle(): number {
    return Math.trunc(this.length / 2);
  }

  protected get halfFull(): boolean {
    return this.length >= this.order * 2 - 1;
  }

  protected constructor(public readonly order: number, protected comparator: Comparator<Key>) {
    this.keys = [];
  }

  // public abstract split(): [BTreeNode<Key>, BTreeNode<Key>];

  protected getKeyPosition(key: Key): number {
    let position = 0;

    while (position < this.length && this.comparator.compare(this.keys[position], key) < 0) {
      position++;
    }

    return position;
  }

  public hasKey(key: Key): boolean {
    return this.keys.includes(key);
  }
}

class BTreeInternalNode<Key> extends BTreeNode<Key> {
  private children: BTreeNode<Key>[] = [];

  public constructor(public readonly order: number, comparator: Comparator<Key>) {
    super(order, comparator);
    this.children = [];
  }

  public childForKey(key: Key): BTreeNode<Key> {
    const position = super.getKeyPosition(key);

    return this.children[position];
  }
}

class BTreeLeafNode<Key, Value> extends BTreeNode<Key> {
  private values: Value[];

  public constructor(public readonly order: number, comparator: Comparator<Key>) {
    super(order, comparator);
    this.values = [];
  }

  public split(): [BTreeNode<Key>, BTreeNode<Key>] {
    const newNode = new BTreeLeafNode(this.order, this.comparator);
    return [newNode, newNode];
  }

  public put(key: Key, value: Value) {
    const position = super.getKeyPosition(key);

    this.keys.splice(position, 0, key);
    this.values.splice(position, 0, value);
  }

}

function isBTreeInternalNode<Key>(node: BTreeNode<Key>): node is BTreeInternalNode<Key> {
  return node instanceof BTreeInternalNode;
}

function isBTreeLeafNode<Key, Value>(node: BTreeNode<Key>): node is BTreeLeafNode<Key, Value> {
  return node instanceof BTreeLeafNode;
}

export class BTree<Key, Value> {
  #root: BTreeNode<Key>;

  public get debugData(): any {
    return this.#root;
  }

  public constructor(public readonly order = 5, private comparator: Comparator<Key> = DefaultMaxComparator) {
    this.#root = new BTreeLeafNode(order, comparator);
  }

  private getRecursive(node: BTreeNode<Key>, key: Key): BTreeLeafNode<Key, Value> | undefined {
    if (node.hasKey(key)) {
      return node as BTreeLeafNode<Key, Value>;
    }

    if (isBTreeLeafNode(node)) {
      return undefined;
    }

    if (!isBTreeInternalNode(node)) {
      throw new Error('BTreeNode type is invalid');
    }

    const child = node.childForKey(key);

    return this.getRecursive(child, key);
  }

  private get(key: Key): BTreeLeafNode<Key, Value> | undefined {
    return this.getRecursive(this.#root, key);
  }

  private putRecursive(node: BTreeNode<Key>, key: Key, value: Value): BTreeNode<Key> {
    if (isBTreeLeafNode(node)) {
      node.put(key, value);

      return node;
    }

    if (!isBTreeInternalNode(node)) {
      throw new Error('BTreeNode type is invalid');
    }

    const child = node.childForKey(key);

    const xxx = this.putRecursive(child, key, value);

    return node;
  }


  public put(key: Key, value: Value): void {
    this.#root = this.putRecursive(this.#root, key, value);
  }
}
