import { testWeightedEdgeDiGraph } from '../weighted_edge_digraph/testWeightedEdgeDiGraph.ts';
import { AcyclicShortPath } from './AcyclicShortPath.ts';

const weightedEdgeDiGraph = testWeightedEdgeDiGraph();

const startVertex = 0;

const acyclicShortPath = new AcyclicShortPath(weightedEdgeDiGraph, startVertex);

for (const vertex of weightedEdgeDiGraph) {
  console.log('distance from ', startVertex, `->`, vertex, '=', acyclicShortPath.distTo(vertex));
  for (const edge of acyclicShortPath.pathTo(vertex)) {
    console.log('#', edge.startVertex, `-[${edge.weight}]-`, edge.endVertex);
  }
}
