import { merge } from '../merge_sort/merge_sort.ts';

export function mergeSortBottomUp(list: number[]): number[] {
  const aux = [...list];
  const n = list.length;

  const n_1 = n - 1;

  for (let pass=1; pass < n; pass = pass + pass) {
    for (let start = 0; start < n - pass; start += pass + pass) {
      const mid = start + pass - 1;
      const end = Math.min(mid + pass, n_1);

      merge(list, aux, start, mid, end);
    }
  }

  return list;
}
