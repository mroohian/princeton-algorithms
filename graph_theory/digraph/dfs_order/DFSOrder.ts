import { Visited } from '../../common/Visited.ts';
import { DiGraph } from '../digraph/DiGraph.ts';

export class DFSOrder implements Iterable<number> {
  readonly #visited: Visited[];
  #valid: boolean;
  readonly #reversePost: number[] = [];

  public get valid(): boolean {
    return this.#valid;
  }

  public constructor(private digraph: DiGraph) {
    this.#visited = new Array(digraph.verticesCount).fill(Visited.NotVisited);
    this.#valid = true;

    for (const vertex of this.digraph) {
      if (this.#visited[vertex] === Visited.Visited) {
        continue;
      }

      this.dfs(vertex);
    }

    this.#reversePost.reverse();
  }

  private dfs(startVertex: number): void {
    this.#visited[startVertex] = Visited.Visiting;

    for (const edge of this.digraph.adjacent(startVertex)) {
      if (this.#visited[edge.endVertex] === Visited.Visiting) {
        console.warn(`WARN: Detected a cycle containing the edge: ${startVertex}->${edge.endVertex}`);
        this.#valid = false;
        continue;
      }

      if (this.#visited[edge.endVertex] === Visited.Visited) {
        continue;
      }

      this.dfs(edge.endVertex);
    }

    this.#visited[startVertex] = Visited.Visited;
    this.#reversePost.push(startVertex);
  }

  public [Symbol.iterator](): Iterator<number> {
    return this.#reversePost[Symbol.iterator]();
  }
}
