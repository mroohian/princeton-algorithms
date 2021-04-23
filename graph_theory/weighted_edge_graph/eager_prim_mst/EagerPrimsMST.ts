import { Queue } from '../../../ds/queue/Queue.ts';
import { DefaultMinComparator } from '../../../ds/comparator/Comparator.ts';
import { IndexPriorityQueue } from '../../../ds/index_priority_queue/IndexPriorityQueue.ts';
import { Edge } from '../weighted_edge_graph/Edge.ts';
import { WeightedEdgeGraph } from '../weighted_edge_graph/WeightedEdgeGraph.ts';

export class EagerPrimsMST implements Iterable<Edge> {
  readonly #mst: Queue<Edge>;

  public constructor(weightedEdgeGraph: WeightedEdgeGraph) {
    this.#mst = new Queue<Edge>();
    
    const edgeTo = new Array(weightedEdgeGraph.verticesCount);
    const distTo = new Array(weightedEdgeGraph.verticesCount).fill(Infinity);
    const marked = new Array(weightedEdgeGraph.verticesCount).fill(false);
    const indexMinPriorityQueue = new IndexPriorityQueue<number>(DefaultMinComparator);

    const scan = (vertex: number): void => {
      marked[vertex] = true;

      for (const edge of weightedEdgeGraph.adjacent(vertex)) {
        const otherVertex = edge.otherEnd(vertex) as number;
        if (marked[otherVertex]) {
          continue;
        }

        if (edge.weight >= distTo[otherVertex]) {
          continue;
        }

        distTo[otherVertex] = edge.weight;
        edgeTo[otherVertex] = edge;

        if (indexMinPriorityQueue.contains(otherVertex)) {
          indexMinPriorityQueue.promote(otherVertex, edge.weight);
        } else {
          indexMinPriorityQueue.insert(otherVertex, edge.weight);
        }
      }
    };

    const prim = (vertex: number): void => {
      distTo[vertex] = 0;
      indexMinPriorityQueue.insert(vertex, 0);
  
      while (!indexMinPriorityQueue.isEmpty) {
        const minVertex = indexMinPriorityQueue.minIndex() as number;
        indexMinPriorityQueue.pop();

        scan(minVertex);
      }
    };


    // start from each vertex to find minimum spanning forest
    for (const vertex of weightedEdgeGraph) {
      if (marked[vertex]) {
        continue;
      }

      prim(vertex);
    }

    for (const edge of edgeTo.filter(edge => edge !== undefined)) {
      this.#mst.enqueue(edge);
    }
  }

  public [Symbol.iterator](): Iterator<Edge> {
    return this.#mst[Symbol.iterator]();
  }
}
