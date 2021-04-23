export function insertionSort(list: number[], start = 0, end = list.length): number[] {
  for (let i = start; i < end; i++) {
    const current = list[i];

    // The last element of our sorted subarray
    let j = i - 1;
    while (j >= start && current < list[j]) {
      list[j + 1] = list[j];
      j--;
    }
    list[j + 1] = current;
  }

  return list;
}
