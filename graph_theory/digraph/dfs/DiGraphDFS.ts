import { Visited } from '../../common/Visited.ts';
import { DiGraph } from '../digraph/DiGraph.ts';
import { Paths } from '../digraph/Paths.ts';

export class DiGraphDFS extends Paths {
  readonly #visited: Visited[];
  readonly #edgeTo: (number | undefined)[];

  public constructor(digraph: DiGraph, start: number) {
    super(digraph, start);

    this.#visited = new Array(digraph.verticesCount).fill(Visited.NotVisited);
    this.#edgeTo = new Array(digraph.verticesCount);

    this.dfs(start);
  }

  private dfs(startVertex: number): void {
    this.#visited[startVertex] = Visited.Visiting;

    for (const edge of this.digraph.adjacent(startVertex)) {
      if (this.#visited[edge.endVertex] === Visited.Visiting) {
        console.warn(`Detected a cycle containing the edge: ${startVertex}->${edge.endVertex}`);
        continue;
      }

      if (this.#visited[edge.endVertex] === Visited.Visited) {
        continue;
      }

      this.dfs(edge.endVertex);
      this.#edgeTo[edge.endVertex] = startVertex;
    }

    this.#visited[startVertex] = Visited.Visited;
  }

  public hasPathTo(vertex: number): boolean {
    return this.#visited[vertex] === Visited.Visited;
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
