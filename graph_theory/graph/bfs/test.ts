import { testGraph } from '../graph/testGraph.ts';
import { GraphBFS } from './GraphBFS.ts';

const graph = testGraph();

const bfs = new GraphBFS(graph, 0);

for (const vertex1 of graph) {
  console.log('--', vertex1, bfs.hasPathTo(vertex1));

  for (const vertex2 of bfs.pathTo(vertex1)) {
    console.log(vertex2);
  }
}
