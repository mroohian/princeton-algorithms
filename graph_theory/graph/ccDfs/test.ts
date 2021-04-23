import { testGraph } from '../graph/testGraph.ts';
import { GraphCCDFS } from './GraphCCDFS.ts';

const graph = testGraph();

const ccdfs = new GraphCCDFS(graph);

for (const vertex1 of graph) {
  console.log(vertex1, 'id:', ccdfs.getVertexId(vertex1));
}

console.log(9, '->', 12, ccdfs.verticesConnected(9, 12));
