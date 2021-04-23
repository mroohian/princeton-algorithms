import { DiGraph } from '../digraph/DiGraph.ts';
import { Paths } from '../digraph/Paths.ts';
import { Queue } from '../../../ds/queue/Queue.ts';

export class DiGraphBFS extends Paths {
  readonly #distTo: (number | undefined)[];
  readonly #edgeTo: (number | undefined)[];

  public constructor(digraph: DiGraph, start: number) {
    super(digraph, start);

    this.#distTo = new Array(digraph.verticesCount);
    this.#edgeTo = new Array(digraph.verticesCount);

    this.bfs(start);
  }

  private bfs(startVertex: number): void {
    const queue = new Queue<number>();

    queue.enqueue(startVertex);
    this.#distTo[startVertex] = 0;

    while (!queue.isEmpty) {
      const vertex = queue.dequeue() as number;
      const nextDistance = (this.#distTo[vertex] as number) + 1;

      for (const edge of this.digraph.adjacent(vertex)) {
        if (this.#distTo[edge.endVertex] !== undefined) {
          continue;
        }

        queue.enqueue(edge.endVertex);
        this.#edgeTo[edge.endVertex] = vertex;
        this.#distTo[edge.endVertex] = nextDistance;
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
