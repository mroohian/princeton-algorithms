import { DefaultMinComparator } from '../../../ds/comparator/Comparator.ts';
import { IndexPriorityQueue } from '../../../ds/index_priority_queue/IndexPriorityQueue.ts';
import { DirectedEdge } from '../weighted_edge_digraph/DirectedEdge.ts';
import { WeightedEdgeDiGraph } from '../weighted_edge_digraph/WeightedEdgeDiGraph.ts';

export class DijkstraShortPath {
  readonly #distTo: number[];
  readonly #edgeTo: (DirectedEdge | undefined)[];
  readonly #indexMinPriorityQueue: IndexPriorityQueue<number>;

  public constructor(
    private weightedEdgeDiGraph: WeightedEdgeDiGraph,
    startVertex: number
  ) {
    this.#edgeTo = new Array(weightedEdgeDiGraph.verticesCount);
    this.#distTo = new Array(weightedEdgeDiGraph.verticesCount).fill(Infinity);
    this.#distTo[startVertex] = 0;

    this.#indexMinPriorityQueue = new IndexPriorityQueue<number>(DefaultMinComparator);
    this.#indexMinPriorityQueue.insert(startVertex, this.#distTo[startVertex]);

    while (!this.#indexMinPriorityQueue.isEmpty) {
      const vertex = this.#indexMinPriorityQueue.minIndex() as number;
      this.#indexMinPriorityQueue.pop();

      for (const edge of this.weightedEdgeDiGraph.adjacent(vertex)) {
        this.relax(edge);
      }
    }
  }

  private relax(edge: DirectedEdge): void {
    const startDistance = this.#distTo[edge.startVertex];

    if (startDistance === undefined) {
      throw new Error('cannot relax and edge with undefined start distance');
    }

    const alternativeEndDistance = startDistance + edge.weight;

    const endDistance = this.#distTo[edge.endVertex] ?? Infinity;
    if (endDistance <= alternativeEndDistance) {
      return;
    }

    this.#distTo[edge.endVertex] = alternativeEndDistance;
    this.#edgeTo[edge.endVertex] = edge;

    if (this.#indexMinPriorityQueue.contains(edge.endVertex)) {
      this.#indexMinPriorityQueue.promote(edge.endVertex, alternativeEndDistance);
    } else {
      this.#indexMinPriorityQueue.insert(edge.endVertex, alternativeEndDistance);
    }
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
