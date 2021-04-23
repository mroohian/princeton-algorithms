import { testWeightedEdgeDiGraph } from '../weighted_edge_digraph/testWeightedEdgeDiGraph.ts';
import { DijkstraShortPath } from './DijkstraShortPath.ts';

const weightedEdgeDiGraph = testWeightedEdgeDiGraph();

const startVertex = 0;

const singleShortPath = new DijkstraShortPath(weightedEdgeDiGraph, startVertex);

for (const vertex of weightedEdgeDiGraph) {
  console.log('distance from ', startVertex, `->`, vertex, '=', singleShortPath.distTo(vertex));
  for (const edge of singleShortPath.pathTo(vertex)) {
    console.log('#', edge.startVertex, `-[${edge.weight}]-`, edge.endVertex);
  }
}
