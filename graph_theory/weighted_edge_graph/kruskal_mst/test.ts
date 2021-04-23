import { KruskalMST } from './KruskalMST.ts'
import { testWeightedEdgeGraph } from '../weighted_edge_graph/testWeightedEdgeGraph.ts';

const weightedEdgeGraph = testWeightedEdgeGraph();

const mst = new KruskalMST(weightedEdgeGraph);

for (const edge of mst) {
  console.log(edge.either, `--[${edge.weight}]--`, edge.otherEnd(edge.either));
}
