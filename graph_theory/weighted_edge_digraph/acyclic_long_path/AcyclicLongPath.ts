import { DFSOrder } from '../dfs_order/DFSOrder.ts';
import { DirectedEdge } from '../weighted_edge_digraph/DirectedEdge.ts';
import { WeightedEdgeDiGraph } from '../weighted_edge_digraph/WeightedEdgeDiGraph.ts';

export class AcyclicLongPath {
  readonly #distTo: number[];
  readonly #edgeTo: (DirectedEdge | undefined)[];

  public constructor(
    private weightedEdgeDiGraph: WeightedEdgeDiGraph,
    startVertex: number
  ) {
    this.#edgeTo = new Array(weightedEdgeDiGraph.verticesCount);
    this.#distTo = new Array(weightedEdgeDiGraph.verticesCount).fill(Infinity);
    this.#distTo[startVertex] = 0;

    const dfsOrder = new DFSOrder(weightedEdgeDiGraph);

    for (const vertex of dfsOrder) {
      for (const edge of this.weightedEdgeDiGraph.adjacent(vertex)) {
        this.relax(edge);
      }
    }
  }

  private relax(edge: DirectedEdge): void {
    const startDistance = this.#distTo[edge.startVertex];
    const endDistance = this.#distTo[edge.endVertex] ?? Infinity;

    if (startDistance === undefined) {
      throw new Error('cannot relax and edge with undefined start distance');
    }

    const alternativeEndDistance = startDistance - edge.weight;

    if (endDistance <= alternativeEndDistance) {
      return;
    }

    this.#distTo[edge.endVertex] = alternativeEndDistance;
    this.#edgeTo[edge.endVertex] = edge;
  }

  public distTo(endVertex: number): number | undefined {
    return -this.#distTo[endVertex];
  }

  public pathTo(endVertex: number): Iterable<DirectedEdge> {
    const path: DirectedEdge[] = [];

    for (let edge = this.#edgeTo[endVertex]; edge !== undefined; edge = this.#edgeTo[edge.startVertex]) {
      path.push(edge);
    }

    return path.reverse();
  }
}
