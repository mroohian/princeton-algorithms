function charCodeAt(value: string, p: number): number {
  if (p > value.length) {
    return -1;
  }

  return value.charCodeAt(p);
}

function msd3WayQuickSortRecursive(
  list: string[],
  start: number,
  end: number,
  p: number
): void {
  if (end <= start) {
    return;
  }

  const partitionKey = charCodeAt(list[start], p);

  let lower = start;
  let i = start + 1;
  let upper = end;

  while (i <= upper) {
    const t = charCodeAt(list[i], p);

    if (t < partitionKey) {
      // swap lower, i
      [list[lower], list[i]] = [list[i], list[lower]];

      i++;
      lower++;
      continue;
    }

    if (t > partitionKey) {
      // swap upper, i
      [list[upper], list[i]] = [list[i], list[upper]];
 
      upper--;
      continue;
    }

    i++;
  }

  msd3WayQuickSortRecursive(list, start, lower - 1, p);
  if (partitionKey !== undefined) {
    msd3WayQuickSortRecursive(list, lower, upper, p + 1);
  }
  msd3WayQuickSortRecursive(list, upper + 1, end, p);
}

export function msd3WayQuickSort(input: string[]): string[] {
  msd3WayQuickSortRecursive(input, 0, input.length - 1, 0);

  return input;
}
