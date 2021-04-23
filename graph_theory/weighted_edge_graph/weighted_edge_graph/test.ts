import { testWeightedEdgeGraph } from './testWeightedEdgeGraph.ts';

const weightedEdgeGraph = testWeightedEdgeGraph();

for (const vertex of weightedEdgeGraph) {
  console.log(vertex);

  for (const edge of weightedEdgeGraph.adjacent(vertex)) {
    console.log(vertex, `-[${edge.weight}]-`, edge.otherEnd(vertex));
  }
}
