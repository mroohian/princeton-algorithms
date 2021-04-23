import { Graph } from './Graph.ts';

export abstract class Paths {
  protected constructor(protected graph: Graph, protected start: number) { }

  public abstract hasPathTo(vertex: number): boolean;

  public abstract pathTo(vertex: number): Iterable<number>;
}