export function lsdRadixSort(
  length: number,
  list: string[],
  minKey: number,
  maxKey: number,
): string[] {
  const n = list.length;
  const keyRange = maxKey - minKey + 1;
  const aux = new Array<string>(n);

  for (let p = length - 1; p >= 0; p--) {
    const pointer = new Array(keyRange + 1).fill(0);

    for (let i = 0; i < n; i++) {
      pointer[list[i].charCodeAt(p) - minKey + 1]++;
    }

    for (let j = 1; j <= keyRange; j++) {
      pointer[j] += pointer[j - 1];
    }

    for (let i = 0; i < n; i++) {
      aux[pointer[list[i].charCodeAt(p) - minKey]++] = list[i];
    }

    for (let i = 0; i < n; i++) {
      list[i] = aux[i];
    }
  }

  return list;
}
