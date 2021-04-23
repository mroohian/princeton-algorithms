import { Edge } from './Edge.ts';

export class Graph implements Iterable<number> {
  readonly #n: number;
  readonly #edges: Edge[];
  readonly #adjacency: readonly Set<Edge>[];

  public get verticesCount(): number {
    return this.#n;
  }

  public get edgesCount(): number {
    return this.#edges.length;
  }

  public get edges(): Iterable<Edge> {
    return this.#edges;
  }

  public constructor(n: number) {
    this.#n = n;
    this.#edges = [];
    this.#adjacency = [...Array(n)].map(() => new Set());
  }

  public addEdge(edge: Edge): void {
    if (edge.vertex1 === edge.vertex2) {
      throw new Error(`Invalid self-loop edge ${edge.vertex1} -> ${edge.vertex2}`);
    }

    this.#edges.push(edge);
    this.#adjacency[edge.vertex1].add(edge);
    this.#adjacency[edge.vertex2].add(edge);
  }

  public adjacent(vertex: number): Iterable<Edge> {
    return this.#adjacency[vertex][Symbol.iterator]();
  }

  public [Symbol.iterator](): Iterator<number> {
    return this.#adjacency.keys();
  }
}
