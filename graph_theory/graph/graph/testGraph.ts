import { Edge } from './Edge.ts';
import { Graph } from './Graph.ts';

export function testGraph(): Graph {
  const graph = new Graph(13);

  graph.addEdge(new Edge(0, 1));
  graph.addEdge(new Edge(0, 2));
  graph.addEdge(new Edge(0, 5));
  graph.addEdge(new Edge(0, 6));

  graph.addEdge(new Edge(1, 0));

  graph.addEdge(new Edge(2, 0));

  graph.addEdge(new Edge(3, 4));
  graph.addEdge(new Edge(3, 5));

  graph.addEdge(new Edge(4, 3));
  graph.addEdge(new Edge(4, 5));
  graph.addEdge(new Edge(4, 6));

  graph.addEdge(new Edge(5, 0));
  graph.addEdge(new Edge(5, 3));
  graph.addEdge(new Edge(5, 4));

  graph.addEdge(new Edge(6, 0));
  graph.addEdge(new Edge(6, 4));

  graph.addEdge(new Edge(7, 8));

  graph.addEdge(new Edge(8, 7));

  graph.addEdge(new Edge(9, 10));
  graph.addEdge(new Edge(9, 11));
  graph.addEdge(new Edge(9, 12));

  graph.addEdge(new Edge(10, 9));

  graph.addEdge(new Edge(11, 9));
  graph.addEdge(new Edge(11, 12));

  graph.addEdge(new Edge(12, 9));
  graph.addEdge(new Edge(12, 11));

  return graph;
}
