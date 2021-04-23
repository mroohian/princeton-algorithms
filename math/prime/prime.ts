export function prime(value: number): boolean {
  if (value < 2) {
    return false;
  }

  for (let x = 2; x * x <= value; x++) {
    if (value % x === 0) {
      return false;
    }
  }

  return true;
}
