import { testWeightedEdgeDiGraph } from '../weighted_edge_digraph/testWeightedEdgeDiGraph.ts';
import { AcyclicLongPath } from './AcyclicLongPath.ts';

const weightedEdgeDiGraph = testWeightedEdgeDiGraph();

const startVertex = 0;

const acyclicLongPath = new AcyclicLongPath(weightedEdgeDiGraph, startVertex);

for (const vertex of weightedEdgeDiGraph) {
  console.log('distance from ', startVertex, `->`, vertex, '=', acyclicLongPath.distTo(vertex));
  for (const edge of acyclicLongPath.pathTo(vertex)) {
    console.log('#', edge.startVertex, `-[${edge.weight}]-`, edge.endVertex);
  }
}
