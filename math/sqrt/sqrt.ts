export function sqrt(value: number, precision = 0.000000000001): number {
  let low = 0;
  let high = value;

  let prevResult = value;
  while (true) {
    const result = (high + low) / 2;
    if (Math.abs(result - prevResult) < precision) {
      return result;
    }

    prevResult = result;

    const square = result * result;
    if (square > value) {
      high = result;
    } else if (square < value) {
      low = result;
    }
  }
}