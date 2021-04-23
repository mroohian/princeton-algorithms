import { DiGraph } from './DiGraph.ts';
import { DirectedEdge } from "./DirectedEdge.ts";

export function testDiGraph(): DiGraph {
  const graph = new DiGraph(13);

  graph.addEdge(new DirectedEdge(0, 1));
  graph.addEdge(new DirectedEdge(0, 5));

  graph.addEdge(new DirectedEdge(2, 0));
  graph.addEdge(new DirectedEdge(2, 3));

  graph.addEdge(new DirectedEdge(3, 2));
  graph.addEdge(new DirectedEdge(3, 5));

  graph.addEdge(new DirectedEdge(4, 3));
  graph.addEdge(new DirectedEdge(4, 2));

  graph.addEdge(new DirectedEdge(5, 4));

  graph.addEdge(new DirectedEdge(6, 0));
  graph.addEdge(new DirectedEdge(6, 4));
  graph.addEdge(new DirectedEdge(6, 8));
  graph.addEdge(new DirectedEdge(6, 9));

  graph.addEdge(new DirectedEdge(7, 6));
  graph.addEdge(new DirectedEdge(7, 9));

  graph.addEdge(new DirectedEdge(8, 6));

  graph.addEdge(new DirectedEdge(9, 10));
  graph.addEdge(new DirectedEdge(9, 11));

  graph.addEdge(new DirectedEdge(10, 12));

  graph.addEdge(new DirectedEdge(11, 4));
  graph.addEdge(new DirectedEdge(11, 12));

  graph.addEdge(new DirectedEdge(12, 9));

  return graph;
}
