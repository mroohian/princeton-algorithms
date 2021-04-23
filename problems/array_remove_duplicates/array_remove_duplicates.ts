export function arrayRemoveDuplicates(sortedList: number[]): number {
  const n = sortedList.length;

  let i = 0;

  for (let j = 0; j < n; j++) {
    if (sortedList[i] !== sortedList[j]) {
      sortedList[++i] = sortedList[j];
    }
  }

  i++;

  for (let j = i; j < n; j++) {
    sortedList.pop();
  }

  return i;
}
