import { DirectedEdge } from '../weighted_edge_digraph/DirectedEdge.ts';
import { WeightedEdgeDiGraph } from '../weighted_edge_digraph/WeightedEdgeDiGraph.ts';

export class BellmanFordShortPath {
  readonly #distTo: number[];
  readonly #edgeTo: (DirectedEdge | undefined)[];

  public constructor(
    private weightedEdgeDiGraph: WeightedEdgeDiGraph,
    startVertex: number
  ) {
    this.#edgeTo = new Array(weightedEdgeDiGraph.verticesCount);
    this.#distTo = new Array(weightedEdgeDiGraph.verticesCount).fill(Infinity);
    this.#distTo[startVertex] = 0;

    for (let i = 0; i < weightedEdgeDiGraph.verticesCount; i++) {
      for (const vertex of weightedEdgeDiGraph) {
        for (const edge of this.weightedEdgeDiGraph.adjacent(vertex)) {
          this.relax(edge);
        }
      }  
    }
  }

  private relax(edge: DirectedEdge): void {
    const startDistance = this.#distTo[edge.startVertex];
    const endDistance = this.#distTo[edge.endVertex] ?? Infinity;

    if (startDistance === undefined) {
      throw new Error('cannot relax and edge with undefined start distance');
    }

    const alternativeEndDistance = startDistance + edge.weight;

    if (endDistance <= alternativeEndDistance) {
      return;
    }

    this.#distTo[edge.endVertex] = alternativeEndDistance;
    this.#edgeTo[edge.endVertex] = edge;
  }

  public distTo(endVertex: number): number | undefined {
    return this.#distTo[endVertex];
  }

  public pathTo(endVertex: number): Iterable<DirectedEdge> {
    const path: DirectedEdge[] = [];

    for (let edge = this.#edgeTo[endVertex]; edge !== undefined; edge = this.#edgeTo[edge.startVertex]) {
      path.push(edge);
    }

    return path.reverse();
  }
}
