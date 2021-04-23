import { DiGraph } from './DiGraph.ts';

export abstract class Paths {
  protected constructor(protected digraph: DiGraph, protected start: number) { }

  public abstract hasPathTo(vertex: number): boolean;

  public abstract pathTo(vertex: number): Iterable<number>;
}