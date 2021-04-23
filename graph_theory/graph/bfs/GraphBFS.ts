import { Graph } from '../graph/Graph.ts';
import { Paths } from '../graph/Paths.ts';
import { Queue } from '../../../ds/queue/Queue.ts';

export class GraphBFS extends Paths {
  readonly #distTo: (number | undefined)[];
  readonly #edgeTo: (number | undefined)[];

  public constructor(graph: Graph, start: number) {
    super(graph, start);

    this.#distTo = new Array(graph.verticesCount);
    this.#edgeTo = new Array(graph.verticesCount);

    this.bfs(start);
  }

  private bfs(vertex1: number): void {
    const queue = new Queue<number>();

    queue.enqueue(vertex1);
    this.#distTo[vertex1] = 0;

    while (queue.isEmpty === false) {
      const vertex = queue.dequeue() as number;
      const nextDistance = (this.#distTo[vertex] as number) + 1;

      for (const edge of this.graph.adjacent(vertex)) {
        if (this.#distTo[edge.vertex2] !== undefined) {
          continue;
        }

        queue.enqueue(edge.vertex2);
        this.#edgeTo[edge.vertex2] = vertex;
        this.#distTo[edge.vertex2] = nextDistance;
      }
    }
  }

  public hasPathTo(vertex: number): boolean {
    return this.#distTo[vertex] !== undefined;
  }

  public pathTo(vertex: number): Iterable<number> {
    if (!this.hasPathTo(vertex)) {
      return [];
    }

    const path: number[] = [];
    while (vertex !== this.start) {
      path.push(vertex);
      vertex = this.#edgeTo[vertex] as number;
    }
    path.push(this.start);

    return path.reverse()[Symbol.iterator]();
  }
}
