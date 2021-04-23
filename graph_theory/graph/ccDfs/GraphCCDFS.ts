import { Graph } from '../graph/Graph.ts';

export class GraphCCDFS {
  readonly #ccId: (number | undefined)[];
  readonly #count: number;

  public get count(): number {
    return this.#count;
  }

  public constructor(private graph: Graph) {
    this.#ccId = new Array(graph.verticesCount);

    let id = 0;
    for (const vertex of this.graph) {
      if (this.#ccId[vertex] !== undefined) {
        continue;
      }

      this.ccdfs(vertex, id++);
    }

    this.#count = id;
  }

  private ccdfs(vertex1: number, id: number): void {
    this.#ccId[vertex1] = id;

    for (const edge of this.graph.adjacent(vertex1)) {
      if (this.#ccId[edge.vertex2] !== undefined) {
        continue;
      }

      this.ccdfs(edge.vertex2, id);
    }
  }

  public verticesConnected(vertex1: number, vertex2: number): boolean {
    const vertexId1 = this.#ccId[vertex1];

    if (vertexId1 === undefined) {
      return false;
    }

    const vertexId2 = this.#ccId[vertex2];

    if (vertexId2 === undefined) {
      return false;
    }

    return vertexId1 === vertexId2;
  }


  public getVertexId(vertex: number): number | undefined {
    return this.#ccId[vertex];
  }
}
