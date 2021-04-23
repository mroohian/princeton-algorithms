import { DirectedEdge } from '../weighted_edge_digraph/DirectedEdge.ts';
import { WeightedEdgeDiGraph } from '../weighted_edge_digraph/WeightedEdgeDiGraph.ts';
import { BellmanFordShortPath } from './BellmanFordShortPath.ts';

const weightedEdgeDiGraph = new WeightedEdgeDiGraph(7);

weightedEdgeDiGraph.addEdge(new DirectedEdge(0, 1, 0.5));
weightedEdgeDiGraph.addEdge(new DirectedEdge(1, 2, 0.1));
weightedEdgeDiGraph.addEdge(new DirectedEdge(2, 4, 0.3));
weightedEdgeDiGraph.addEdge(new DirectedEdge(3, 2, 0.2));
weightedEdgeDiGraph.addEdge(new DirectedEdge(3, 6, 0.7));
weightedEdgeDiGraph.addEdge(new DirectedEdge(4, 5, -0.9));
weightedEdgeDiGraph.addEdge(new DirectedEdge(5, 3, 0.1));

// TODO: not implemented
/*
const startVertex = 0;


const bellmanFordShortPath = new BellmanFordShortPath(weightedEdgeDiGraph, startVertex);

for (const vertex of weightedEdgeDiGraph) {
  console.log('distance from ', startVertex, `->`, vertex, '=', bellmanFordShortPath.distTo(vertex));
  for (const edge of bellmanFordShortPath.pathTo(vertex)) {
    console.log('#', edge.startVertex, `-[${edge.weight}]-`, edge.endVertex);
  }
}
*/