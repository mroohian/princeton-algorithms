import { testWeightedEdgeDiGraph } from '../weighted_edge_digraph/testWeightedEdgeDiGraph.ts';
import { BellmanFordShortPath } from './BellmanFordShortPath.ts';

const weightedEdgeDiGraph = testWeightedEdgeDiGraph();

const startVertex = 0;

const bellmanFordShortPath = new BellmanFordShortPath(weightedEdgeDiGraph, startVertex);

for (const vertex of weightedEdgeDiGraph) {
  console.log('distance from ', startVertex, `->`, vertex, '=', bellmanFordShortPath.distTo(vertex));
  for (const edge of bellmanFordShortPath.pathTo(vertex)) {
    console.log('#', edge.startVertex, `-[${edge.weight}]-`, edge.endVertex);
  }
}
