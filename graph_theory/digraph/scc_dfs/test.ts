import { testDiGraph } from '../digraph/testDiGraph.ts';
import { SCCDFS } from './SCCDFS.ts';

const digraph = testDiGraph();

const sccdfs = new SCCDFS(digraph);

for (const vertex of digraph) {
  console.log(vertex, 'id:', sccdfs.getVertexId(vertex));
}

console.log(9, '->', 12, sccdfs.verticesStronglyConnected(9, 12));
