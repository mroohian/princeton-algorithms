export function fibonacci(
  n: number,
  prevValues: Record<string, number> = {}
): number {
  if (prevValues[n]) {
    return prevValues[n];
  }

  if (n <= 2) {
    prevValues[n] = 1;
    return 1;
  }

  const result = fibonacci(n - 1, prevValues) + fibonacci(n - 2, prevValues);

  prevValues[n] = result;
  return result;
}
