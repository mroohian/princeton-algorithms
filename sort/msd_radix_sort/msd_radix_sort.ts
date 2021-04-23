function charCodeAt(value: string, p: number): number {
  if (p > value.length) {
    return -1;
  }

  return value.charCodeAt(p);
}

function msdRadixSortRecursive(
  list: string[],
  aux: string[],
  minKey: number,
  maxKey: number,
  start: number,
  end: number,
  p: number
): void {
  if (end <= start) {
    return;
  }

  const keyRange = maxKey - minKey + 1;

  const pointer = new Array(keyRange + 2).fill(0);

  for (let i = start; i <= end; i++) {
    pointer[charCodeAt(list[i], p) - minKey + 2]++;
  }

  for (let j = 1; j <= keyRange + 1; j++) {
    pointer[j] += pointer[j - 1];
  }

  for (let i = start; i <= end; i++) {
    aux[pointer[charCodeAt(list[i], p) - minKey + 1]++] = list[i];
  }

  for (let i = start; i <= end; i++) {
    list[i] = aux[i];
  }

  for (let j = 0; j < keyRange; j++) {
    msdRadixSortRecursive(
      list,
      aux,
      minKey,
      maxKey,
      start + pointer[j],
      start + pointer[j + 1] - 1,
      p + 1
    );
  }
}

export function msdRadixSort(
  list: string[],
  minKey: number,
  maxKey: number
): string[] {
  const aux = new Array<string>(list.length);

  msdRadixSortRecursive(list, aux, minKey, maxKey, 0, list.length - 1, 0);

  return list;
}
