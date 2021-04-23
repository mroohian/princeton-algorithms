import { Queue } from '../../../ds/queue/Queue.ts';
import { PriorityQueue } from '../../../ds/priority_queue/PriorityQueue.ts';
import { Edge } from '../weighted_edge_graph/Edge.ts';
import { WeightedEdgeGraph } from '../weighted_edge_graph/WeightedEdgeGraph.ts';

export class LazyPrimsMST implements Iterable<Edge> {
  readonly #mst: Queue<Edge>;

  public constructor(weightedEdgeGraph: WeightedEdgeGraph) {
    this.#mst = new Queue<Edge>();

    const marked = new Array(weightedEdgeGraph.verticesCount).fill(false);
    const priorityQueue = new PriorityQueue<Edge>({
      compare(e1, e2) {
        return e2.weight - e1.weight;
      }
    });

    const visit = (vertex: number): void => {
      marked[vertex] = true;
      for (const edge of weightedEdgeGraph.adjacent(vertex)) {
        if (marked[edge.otherEnd(vertex) as number]) {
          continue;
        }
        priorityQueue.push(edge);
      }
    };

    const prim = (vertex: number): void => {
      visit(vertex);

      while (!priorityQueue.isEmpty) {
        const edge = priorityQueue.pop();
        const { vertex1, vertex2 } = edge;

        if (marked[vertex1] && marked[vertex2]) {
          continue;
        }

        this.#mst.enqueue(edge);

        if (!marked[vertex1]) {
          visit(vertex1);
        }

        if (!marked[vertex2]) {
          visit(vertex2);
        }
      }
    };

    // start from each vertex to find minimum spanning forest
    for (const vertex of weightedEdgeGraph) {
      if (marked[vertex]) {
        continue;
      }

      prim(vertex);
    }
  }

  public [Symbol.iterator](): Iterator<Edge> {
    return this.#mst[Symbol.iterator]();
  }
}
