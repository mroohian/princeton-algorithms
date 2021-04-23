import { Graph } from '../graph/Graph.ts';
import { Paths } from '../graph/Paths.ts';

export class GraphDFS extends Paths {
  readonly #visited: boolean[];
  readonly #edgeTo: (number | undefined)[];

  public constructor(graph: Graph, start: number) {
    super(graph, start);

    this.#visited = new Array(graph.verticesCount).fill(false);
    this.#edgeTo = new Array(graph.verticesCount);

    this.dfs(start);
  }

  private dfs(vertex1: number): void {
    this.#visited[vertex1] = true;

    for (const edge of this.graph.adjacent(vertex1)) {
      if (this.#visited[edge.vertex2] === true) {
        continue;
      }

      this.dfs(edge.vertex2);
      this.#edgeTo[edge.vertex2] = vertex1;
    }
  }

  public hasPathTo(vertex: number): boolean {
    return this.#visited[vertex] === true;
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
