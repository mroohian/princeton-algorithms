import { insertionSort } from "../insertion_sort/insertion_sort.ts";

const CUTOFF = 7;

export function merge(
  list: number[],
  aux: number[],
  start: number,
  mid: number,
  end: number
): void {
  for (let k = start; k <= end; k++) {
    aux[k] = list[k];
  }

  let i = start;
  let j = mid + 1;
  for (let k = start; k <= end; k++) {
    if (i > mid) {
      list[k] = aux[j++];
    } else if (j > end) {
      list[k] = aux[i++];
    } else if (aux[j] < aux[i]) {
      list[k] = aux[j++];
    } else {
      list[k] = aux[i++];
    }
  }
}

function mergeSortLogic(
  list: number[],
  aux: number[],
  start: number,
  end: number
): void {
  if (start >= end) {
    return;
  }

  if (end <= start + CUTOFF - 1) {
    insertionSort(list, start, end);
  }

  const mid = Math.trunc((start + end) / 2);
  mergeSortLogic(list, aux, start, mid);
  mergeSortLogic(list, aux, mid + 1, end);
  if (list[mid + 1] >= list[mid]) {
    return;
  }
  merge(list, aux, start, mid, end);
}

export function mergeSort(list: number[]): number[] {
  const aux = new Array<number>(list.length);
  mergeSortLogic(list, aux, 0, list.length - 1);
  return list;
}
