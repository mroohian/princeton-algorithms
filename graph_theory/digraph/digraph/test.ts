import { reverse } from './DiGraph.ts';
import { testDiGraph } from './testDiGraph.ts';

const digraph = testDiGraph();

for (const startVertex of digraph) {
  console.log(startVertex);

  for (const edge of digraph.adjacent(startVertex)) {
    console.log(startVertex, '->', edge.endVertex);
  }
}

const reverseDiGraph = reverse(digraph);

for (const startVertex of reverseDiGraph) {
  console.log(startVertex);

  for (const edge of reverseDiGraph.adjacent(startVertex)) {
    console.log(startVertex, '->', edge.endVertex);
  }
}
