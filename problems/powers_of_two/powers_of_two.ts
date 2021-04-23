export function powersOfTwo(value: number): number {
  if (value === 0) {
    return NaN;
  }

  if (value === 1) {
    console.log(value);
    return value;
  }

  const previous = powersOfTwo(value >> 1);
  const current = previous << 1;
  console.log(current);

  return current;
}