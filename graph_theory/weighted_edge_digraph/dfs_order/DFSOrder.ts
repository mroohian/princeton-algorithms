import { Visited } from '../../common/Visited.ts';
import { WeightedEdgeDiGraph } from '../weighted_edge_digraph/WeightedEdgeDiGraph.ts';

export class DFSOrder implements Iterable<number> {
  readonly #visited: Visited[];
  #valid: boolean;
  readonly #reversePost: number[] = [];

  public get valid(): boolean {
    return this.#valid;
  }

  public constructor(private weightedEdgeDiGraph: WeightedEdgeDiGraph) {
    this.#visited = new Array(weightedEdgeDiGraph.verticesCount).fill(Visited.NotVisited);
    this.#valid = true;

    for (const vertex of this.weightedEdgeDiGraph) {
      if (this.#visited[vertex]) {
        continue;
      }

      this.dfs(vertex);
    }

    this.#reversePost.reverse();
  }

  private dfs(vertex: number): void {
    this.#visited[vertex] = Visited.Visiting;

    for (const directedEdge of this.weightedEdgeDiGraph.adjacent(vertex)) {
      if (this.#visited[directedEdge.endVertex] === Visited.Visiting) {
        console.warn('WARN: Detected a cycle containing the edge:', directedEdge);
        this.#valid = false;
        continue;
      }

      if (this.#visited[directedEdge.endVertex] === Visited.Visited) {
        continue;
      }

      this.dfs(directedEdge.endVertex);
    }

    this.#visited[vertex] = Visited.Visited;
    this.#reversePost.push(vertex);
  }

  public [Symbol.iterator](): Iterator<number> {
    return this.#reversePost[Symbol.iterator]();
  }
}
