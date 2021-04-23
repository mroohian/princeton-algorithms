import { testGraph } from '../graph/testGraph.ts';
import { GraphDFS } from './GraphDFS.ts';

const graph = testGraph();

const dfs = new GraphDFS(graph, 0);

for (const vertex1 of graph) {
  console.log('--', vertex1, dfs.hasPathTo(vertex1));

  for (const vertex2 of dfs.pathTo(vertex1)) {
    console.log(vertex2);
  }
}
