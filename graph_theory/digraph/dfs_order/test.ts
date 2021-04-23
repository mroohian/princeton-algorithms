import { DiGraph } from '../digraph/DiGraph.ts';
import { DirectedEdge } from "../digraph/DirectedEdge.ts";
import { testDiGraph } from '../digraph/testDiGraph.ts';
import { DFSOrder } from './DFSOrder.ts';

const digraph = testDiGraph();

const dfsOrder = new DFSOrder(digraph);

console.log('DFS order valid:', dfsOrder.valid);

for (const vertex of dfsOrder) {
  console.log(vertex, [...digraph.adjacent(vertex)]);
}

console.log('-------------');

const digraph1 = new DiGraph(6);

digraph1.addEdge(new DirectedEdge(0, 3));

digraph1.addEdge(new DirectedEdge(1, 3));

// digraph1.addEdge(new DirectedEdge(3, 1)); // cycle
digraph1.addEdge(new DirectedEdge(3, 2));

digraph1.addEdge(new DirectedEdge(5, 0));
digraph1.addEdge(new DirectedEdge(5, 1));

const dfsOrder1 = new DFSOrder(digraph1);

console.log('DFS order valid:', dfsOrder1.valid);

for (const vertex of dfsOrder1) {
  console.log(vertex, [...digraph1.adjacent(vertex)]);
}
