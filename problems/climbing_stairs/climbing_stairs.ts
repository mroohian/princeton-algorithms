function climbingStairsRecursive(index: number, cache: number[]): number {
  if (index <= 1) {
    return 1;
  }

  const cacheValue = cache[index];
  if (cacheValue !== undefined) {
    return cacheValue;
  }

  const result =
    climbingStairsRecursive(index - 1, cache) +
    climbingStairsRecursive(index - 2, cache);

  cache[index] = result;

  return result;
}

export function climbingStairs(n: number): number {
  return climbingStairsRecursive(n, []);
}
