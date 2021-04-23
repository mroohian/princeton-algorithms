import { testDiGraph } from '../digraph/testDiGraph.ts';
import { DiGraphBFS } from './DiGraphBFS.ts';

const digraph = testDiGraph();

const directedBFS = new DiGraphBFS(digraph, 0);

for (const vertex1 of digraph) {
  console.log('--', vertex1, directedBFS.hasPathTo(vertex1));

  for (const vertex2 of directedBFS.pathTo(vertex1)) {
    console.log(vertex2);
  }
}
