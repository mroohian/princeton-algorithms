import { Comparator, DefaultMaxComparator } from '../../ds/comparator/Comparator.ts';

export interface TreeNode<Key, Value> {
  key: Key;
  value: Value;
  count: number;
  left?: TreeNode<Key, Value>;
  right?: TreeNode<Key, Value>;
}

export class BST<Key, Value> {
  #root: TreeNode<Key, Value> | undefined;
  #comparator: Comparator<Key>

  public get debugData(): TreeNode<Key, Value> | undefined {
    return this.#root;
  }

  public get size(): number {
    return this.#root?.count ?? 0;
  }

  public constructor(comparator: Comparator<Key> = DefaultMaxComparator) {
    this.#comparator = comparator;
  }

  private putRecursive(treeNode: TreeNode<Key, Value> | undefined, key: Key, value: Value): TreeNode<Key, Value> {
    if (treeNode === undefined) {
      return { key, value, count: 1 };
    }

    const result = this.#comparator.compare(key, treeNode.key);
    if (result < 0) {
      treeNode.left = this.putRecursive(treeNode.left, key, value);
    } else if (result > 0) {
      treeNode.right = this.putRecursive(treeNode.right, key, value);
    } else {
      treeNode.value = value;
    }

    treeNode.count = 1 + (treeNode.left?.count ?? 0) + (treeNode.right?.count ?? 0);

    return treeNode;
  }

  public put(key: Key, value: Value): void {
    this.#root = this.putRecursive(this.#root, key, value);
  }

  private deleteMin(treeNode: TreeNode<Key, Value> | undefined): TreeNode<Key, Value> | undefined {
    if (treeNode === undefined) {
      return undefined;
    }

    if (treeNode.left === undefined) {
      return treeNode.right;
    }

    treeNode.left = this.deleteMin(treeNode.left);

    treeNode.count = 1 + (treeNode.left?.count ?? 0) + (treeNode.right?.count ?? 0);

    return treeNode;
  }

  private deleteRecursive(treeNode: TreeNode<Key, Value> | undefined, key: Key): TreeNode<Key, Value> | undefined {
    if (treeNode === undefined) {
      return undefined;
    }

    const result = this.#comparator.compare(key, treeNode.key);
    if (result < 0) {
      treeNode.left = this.deleteRecursive(treeNode.left, key);
    } else if (result > 0) {
      treeNode.right = this.deleteRecursive(treeNode.right, key);
    } else {
      if (treeNode.left === undefined) {
        return treeNode.right;
      }

      if (treeNode.right === undefined) {
        return treeNode.left;
      }

      const removedNode = treeNode;
      treeNode = this.min(treeNode.right) as TreeNode<Key, Value>;
      treeNode.right = this.deleteMin(removedNode.right);
      treeNode.left = removedNode.left;
    }

    treeNode.count = 1 + (treeNode.left?.count ?? 0) + (treeNode.right?.count ?? 0);

    return treeNode;
  }

  public delete(key: Key): void {
    this.#root = this.deleteRecursive(this.#root, key);
  }

  public get(key: Key): Value | undefined {
    if (key === undefined) {
      return undefined;
    }

    let treeNode: TreeNode<Key, Value> | undefined = this.#root;

    while (treeNode !== undefined) {
      const result = this.#comparator.compare(key, treeNode.key);
      if (result < 0) {
        treeNode = treeNode.left;
      } else if (result > 0) {
        treeNode = treeNode.right;
      } else {
        return treeNode.value;
      }
    }

    return undefined;
  }

  private *inOrder(treeNode: TreeNode<Key, Value> | undefined): Generator<Key> {
    if (treeNode === undefined) {
      return;
    }

    yield *this.inOrder(treeNode.left);
    yield treeNode.key;
    yield *this.inOrder(treeNode.right);
  }

  private *preOrder(treeNode: TreeNode<Key, Value> | undefined): Generator<Key> {
    if (treeNode === undefined) {
      return;
    }

    yield treeNode.key;
    yield *this.postOrder(treeNode.left);
    yield *this.postOrder(treeNode.right);
  }

  private *postOrder(treeNode: TreeNode<Key, Value> | undefined): Generator<Key> {
    if (treeNode === undefined) {
      return;
    }

    yield *this.postOrder(treeNode.left);
    yield *this.postOrder(treeNode.right);
    yield treeNode.key;
  }

  public *keys(): Generator<Key> {
    yield *this.inOrder(this.#root);
  }

  public *keysPreOrder(): Generator<Key> {
    yield *this.preOrder(this.#root);
  }

  public *keysPostOrder(): Generator<Key> {
    yield *this.postOrder(this.#root);
  }

  public contains(key: Key): boolean {
    return this.get(key) !== undefined;
  }

  private rankRecursive(treeNode: TreeNode<Key, Value> | undefined, key: Key): number {
    if (treeNode === undefined) {
      return 0;
    }

    const result = this.#comparator.compare(key, treeNode.key);

    if (result < 0) {
      return this.rankRecursive(treeNode.left, key);
    }

    if (result > 0) {
      return (treeNode.left?.count ?? 0) + 1 + this.rankRecursive(treeNode.right, key);
    }

    return treeNode.left?.count ?? 0;
  }

  public rank(key: Key): number {
    return this.rankRecursive(this.#root, key);
  }

  public min(treeNode: TreeNode<Key, Value> | undefined = this.#root): TreeNode<Key, Value> | undefined {
    if (treeNode === undefined) {
      return undefined;
    }

    while (treeNode.left !== undefined) {
      treeNode = treeNode.left;
    }

    return treeNode;
  }

  public max(treeNode: TreeNode<Key, Value> | undefined = this.#root): TreeNode<Key, Value> | undefined {
    if (treeNode === undefined) {
      return undefined;
    }

    while (treeNode.right !== undefined) {
      treeNode = treeNode.right;
    }

    return treeNode;
  }

  public minKey(treeNode: TreeNode<Key, Value> | undefined = this.#root): Key | undefined {
    if (treeNode === undefined) {
      return undefined;
    }

    while (treeNode.left !== undefined) {
      treeNode = treeNode.left;
    }

    return treeNode.key;
  }

  public maxKey(treeNode: TreeNode<Key, Value> | undefined = this.#root): Key | undefined {
    if (treeNode === undefined) {
      return undefined;
    }

    while (treeNode.right !== undefined) {
      treeNode = treeNode.right;
    }

    return treeNode.key;
  }

  private floorKeyRecursive(treeNode: TreeNode<Key, Value> | undefined, key: Key): TreeNode<Key, Value> | undefined {
    if (treeNode === undefined) {
      return undefined;
    }

    const result = this.#comparator.compare(key, treeNode.key);

    if (result === 0) {
      return treeNode;
    }

    if (result < 0) {
      return this.floorKeyRecursive(treeNode.left, key);
    }

    const t = this.floorKeyRecursive(treeNode.right, key);
    if (t !== undefined) {
      return t;
    }

    return treeNode;
  }

  public floorKey(key: Key): Key | undefined {
    const treeNode = this.floorKeyRecursive(this.#root, key);
    if (treeNode === undefined) {
      return undefined;
    }

    return treeNode.key;
  }

  private ceilingKeyRecursive(treeNode: TreeNode<Key, Value> | undefined, key: Key): TreeNode<Key, Value> | undefined {
    if (treeNode === undefined) {
      return undefined;
    }

    const result = this.#comparator.compare(key, treeNode.key);

    if (result === 0) {
      return treeNode;
    }

    if (result > 0) {
      return this.ceilingKeyRecursive(treeNode.right, key);
    }

    const t = this.ceilingKeyRecursive(treeNode.left, key);
    if (t !== undefined) {
      return t;
    }

    return treeNode;
  }

  public ceilingKey(key: Key): Key | undefined {
    const treeNode = this.ceilingKeyRecursive(this.#root, key);
    if (treeNode === undefined) {
      return undefined;
    }

    return treeNode.key;
  }
}
