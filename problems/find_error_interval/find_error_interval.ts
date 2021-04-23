function hasErrorInterval(a: number[], p: number, t: number): boolean {
  let intervalStart = p;
  let intervalEnd = p;

  let minValue = a[p];

  const intervalSize = () => 1 + intervalEnd - intervalStart;

  let errorRate = minValue * intervalSize();

  while ((intervalStart !== 0 || intervalEnd !== a.length - 1) && errorRate < t) {
    console.log(intervalStart, intervalEnd, minValue);

    // a[intervalStart - 1] ?? Number.NEGATIVE_INFINITY
    const beforeValue = intervalStart > 0 ? a[intervalStart - 1] : Number.NEGATIVE_INFINITY;
    const afterValue = intervalEnd < a.length - 1 ? a[intervalEnd + 1] : Number.NEGATIVE_INFINITY;

    if (afterValue >= beforeValue) {
      intervalEnd++;
      minValue = Math.min(minValue, afterValue);
    } else {
      intervalStart--;
      minValue = Math.min(minValue, beforeValue);
    }

    errorRate = minValue * intervalSize();
  }

  return errorRate >= t;
}

const result = hasErrorInterval([1, 2 , 4, 10, 9, 10, 10, 5], 0, 36);

console.log(result);
