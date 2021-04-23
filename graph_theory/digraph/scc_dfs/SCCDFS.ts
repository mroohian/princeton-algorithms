import { DiGraph, reverse } from '../digraph/DiGraph.ts';
import { DFSOrder } from '../dfs_order/DFSOrder.ts';

export class SCCDFS {
  readonly #ccId: (number | undefined)[];
  readonly #count: number;

  public get count(): number {
    return this.#count;
  }

  public constructor(private graph: DiGraph) {
    this.#ccId = new Array(graph.verticesCount);

    const dfsOrder = new DFSOrder(reverse(graph));

    if (!dfsOrder.valid) {
      console.warn('Getting connected component of cyclic graph!');
    }

    let id = 0;
    for (const vertex of dfsOrder) {
      if (this.#ccId[vertex] !== undefined) {
        continue;
      }

      this.sccdfs(vertex, id++);
    }

    this.#count = id;
  }

  private sccdfs(vertex: number, id: number): void {
    this.#ccId[vertex] = id;

    for (const edge of this.graph.adjacent(vertex)) {
      if (this.#ccId[edge.endVertex] !== undefined) {
        continue;
      }

      this.sccdfs(edge.endVertex, id);
    }
  }

  public verticesStronglyConnected(v: number, w: number): boolean {
    const vId = this.#ccId[v];

    if (vId === undefined) {
      return false;
    }

    const wId = this.#ccId[w];

    if (wId === undefined) {
      return false;
    }

    return vId === wId;
  }


  public getVertexId(vertex: number): number | undefined {
    return this.#ccId[vertex];
  }
}
