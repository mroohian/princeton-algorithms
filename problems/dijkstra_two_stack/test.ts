const { args } = Deno;

import { dijkstraTwoStack } from "./dijkstra_two_stack.ts";

const input = args[0];

console.log("input", input);

try {
  const output = dijkstraTwoStack(input);
  console.log("output", output);
} catch (error) {
  console.error(`ERROR: ${error.message}`);
}
