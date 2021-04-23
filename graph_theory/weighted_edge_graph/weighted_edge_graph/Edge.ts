export class Edge {
  public get either(): number {
    return this.vertex1;
  }

  public constructor(
    public readonly vertex1: number,
    public readonly vertex2: number,
    public readonly weight: number
  ) {}

  public otherEnd(vertex: number): number | undefined {
    if (vertex === this.vertex1) {
      return this.vertex2;
    }

    if (vertex === this.vertex2) {
      return this.vertex1;
    }

    return undefined;
  }

  public compareTo(edge: Edge): number {
    return this.weight - edge.weight;
  }
}
