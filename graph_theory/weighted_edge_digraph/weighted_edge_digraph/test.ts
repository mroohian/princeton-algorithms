import { testWeightedEdgeDiGraph } from './testWeightedEdgeDiGraph.ts';

const weightedEdgeDiGraph = testWeightedEdgeDiGraph();

for (const vertex of weightedEdgeDiGraph) {
  console.log(vertex);

  for (const edge of weightedEdgeDiGraph.adjacent(vertex)) {
    console.log(edge.startVertex, `-[${edge.weight}]->`, edge.endVertex);
  }
  }
