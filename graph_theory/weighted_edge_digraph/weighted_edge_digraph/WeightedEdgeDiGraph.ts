import { DirectedEdge } from './DirectedEdge.ts';

export class WeightedEdgeDiGraph implements Iterable<number> {
    readonly #n: number;
    readonly #edges: DirectedEdge[];
    readonly #adjacency: readonly Set<DirectedEdge>[];

    public get verticesCount(): number {
      return this.#n;
    }

    public get edgesCount(): number {
      return this.#edges.length;
    }

    public get edges(): Iterable<DirectedEdge> {
      return this.#edges;
    }

    public constructor(n: number) {
      this.#n = n;
      this.#edges = [];
      this.#adjacency = [...Array(n)].map(() => new Set());
    }

    public addEdge(directedEdge: DirectedEdge): void {
      if (directedEdge.startVertex === directedEdge.endVertex) {
        throw new Error(`Invalid self-loop edge ${directedEdge.startVertex} -> ${directedEdge.endVertex}`);
      }

      this.#edges.push(directedEdge);
      this.#adjacency[directedEdge.startVertex].add(directedEdge);
    }

    public adjacent(vertex: number): Iterable<DirectedEdge> {
      return this.#adjacency[vertex][Symbol.iterator]();
    }

    public [Symbol.iterator](): Iterator<number> {
      return Array(this.verticesCount).keys();
    }
  }
