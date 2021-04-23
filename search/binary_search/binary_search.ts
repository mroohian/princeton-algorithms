export function binarySearch(list: number[], value: number, start = 0, end = list.length - 1): number {
  while(start <= end) {
    const mid = Math.trunc((start + end) / 2);

    const midValue = list[mid];

    // console.log(start, mid, end, '=', midValue);

    if (midValue > value) {
      end = mid - 1;
    } else if (midValue < value) {
      start = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}