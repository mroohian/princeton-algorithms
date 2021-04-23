export function bitonicMax(list: number[], start = 0, end = list.length - 1): number {
  while(start <= end) {
    const mid = Math.trunc((start + end) / 2);

    const midValue = list[mid];

    if (end === start + 1) { 
      if (list[start] >= list[end]) {
        return start;
      }

      return end;
    }

    const prevValue = mid > 0 ? list[mid - 1] : Number.MIN_SAFE_INTEGER;
    const nextValue = mid < end ? list[mid + 1] : Number.MIN_SAFE_INTEGER;
    
    console.log(start, mid, end, [prevValue,  midValue, nextValue]);

    if (midValue < prevValue) {
      end = mid - 1;
    } else if (midValue < nextValue) {
      start = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
}