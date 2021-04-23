export function partition(list: number[], start: number, end: number): number {
  const partitionKey = list[start];

  let i = start + 1;
  let j = end;

  while (true) {
    while (partitionKey > list[i]) {
      i++;

      if (i === end) {
        break;
      }
    }

    while (partitionKey < list[j]) {
      j--;

      if (j === start + 1) {
        break;
      }
    }

    if (i > j) {
      break;
    }

    // swap i, j
    [list[i], list[j]] = [list[j], list[i]];
  }

  // swap start, j
  [list[start], list[j]] = [list[j], list[start]];

  return j;
}

function quickSortLogic(list: number[], start: number, end: number): void {
  if (start >= end) {
    return;
  }

  const mid = partition(list, start, end);

  if (mid > start + 1) {
    quickSortLogic(list, start, mid - 1);
  }
  if (mid < end - 1) {
    quickSortLogic(list, mid + 1, end);
  }
}

export function quickSort(list: number[]): number[] {
  // list.shuffle();
  quickSortLogic(list, 0, list.length - 1);
  return list;
}
