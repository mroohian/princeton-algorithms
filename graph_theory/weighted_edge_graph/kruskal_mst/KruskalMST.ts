import { Queue } from '../../../ds/queue/Queue.ts';
import { PriorityQueue } from '../../../ds/priority_queue/PriorityQueue.ts';
import { QuickUnion } from '../../../union_find/quick_union/QuickUnion.ts';
import { Edge } from '../weighted_edge_graph/Edge.ts';
import { WeightedEdgeGraph } from '../weighted_edge_graph/WeightedEdgeGraph.ts';

export class KruskalMST implements Iterable<Edge> {
  readonly #mst: Queue<Edge>;

  public constructor(weightedEdgeGraph: WeightedEdgeGraph) {
    this.#mst = new Queue<Edge>();

    const priorityQueue = new PriorityQueue<Edge>({
      compare(edge1, edge2) {
        return edge2.weight - edge1.weight;
      }
    });

    priorityQueue.push(...weightedEdgeGraph.edges);

    const quickUnion = new QuickUnion(weightedEdgeGraph.verticesCount);
    while (!priorityQueue.isEmpty && this.#mst.length < weightedEdgeGraph.verticesCount - 1) {
      const edge = priorityQueue.pop();
      const { vertex1, vertex2 } = edge;

      if (quickUnion.connected(vertex1, vertex2)) {
        continue;
      }

      quickUnion.union(vertex1, vertex2);
      this.#mst.enqueue(edge);
    }
  }

  public [Symbol.iterator](): Iterator<Edge> {
    return this.#mst[Symbol.iterator]();
  }
}
