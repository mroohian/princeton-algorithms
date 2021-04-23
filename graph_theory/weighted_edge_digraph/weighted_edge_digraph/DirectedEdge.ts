export class DirectedEdge {
  public constructor(
    public readonly startVertex: number,
    public readonly endVertex: number,
    public readonly weight: number
  ) {}
}
