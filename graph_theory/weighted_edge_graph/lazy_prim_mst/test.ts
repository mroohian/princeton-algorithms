import { LazyPrimsMST } from './LazyPrimsMST.ts'
import { testWeightedEdgeGraph } from '../weighted_edge_graph/testWeightedEdgeGraph.ts';

const weightedEdgeGraph = testWeightedEdgeGraph();

const mst = new LazyPrimsMST(weightedEdgeGraph);

for (const edge of mst) {
  console.log(edge.either, `--[${edge.weight}]--`, edge.otherEnd(edge.either));
}
