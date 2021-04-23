import { DirectedEdge } from '../weighted_edge_digraph/DirectedEdge.ts';
import { testWeightedEdgeDiGraph } from '../weighted_edge_digraph/testWeightedEdgeDiGraph.ts';
import { DFSOrder } from './DFSOrder.ts';

const weightedEdgeDiGraph = testWeightedEdgeDiGraph();

const dfsOrder = new DFSOrder(weightedEdgeDiGraph);

console.log('DFS order valid:', dfsOrder.valid);

for (const v of dfsOrder) {
  console.log(v, [...weightedEdgeDiGraph.adjacent(v)]);
}

console.log('-------------');

weightedEdgeDiGraph.addEdge(new DirectedEdge(4, 0, 1)); // Cycle

const dfsOrder1 = new DFSOrder(weightedEdgeDiGraph);

console.log('DFS order valid:', dfsOrder1.valid);

for (const v of dfsOrder) {
  console.log(v, [...weightedEdgeDiGraph.adjacent(v)]);
}
