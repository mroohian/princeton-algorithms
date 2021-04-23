import { testGraph } from './testGraph.ts';

const graph = testGraph();

for (const vertex1 of graph) {
  console.log(vertex1);

  for (const vertex2 of graph.adjacent(vertex1)) {
    console.log(vertex1, vertex2);
  }
}
