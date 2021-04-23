import { testDiGraph } from '../digraph/testDiGraph.ts';
import { DiGraphDFS } from './DiGraphDFS.ts';

const digraph = testDiGraph();

const directedDFS = new DiGraphDFS(digraph, 0);

for (const vertex1 of digraph) {
  console.log('--', vertex1, directedDFS.hasPathTo(vertex1));

  for (const vertex2 of directedDFS.pathTo(vertex1)) {
    console.log(vertex2);
  }
}
