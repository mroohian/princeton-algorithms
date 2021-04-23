export function keyIndexCountingSort(
  n: number,
  maxKey: number,
  keys: number[],
  values: number[]
): number[] {
  const pointer = new Array(maxKey + 1).fill(0);
  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    pointer[keys[i] + 1]++;
  }

  for (let j = 1; j <= maxKey; j++) {
    pointer[j] += pointer[j - 1];
  }

  for (let i = 0; i < n; i++) {
    result[pointer[keys[i]]++] = values[i];
  }

  return result;
}
