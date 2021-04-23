export function findNeedleInHaystack(haystack: string, needle: string): number {
  const n = haystack.length;
  const m = needle.length;

  let i = 0;
  let j = 0;
  for (; i < n && j < m; i++) {
    if (haystack[i] !== needle[j]) {
      i -= j; // Back up

      j = 0;

      continue;
    }

    j++;
  }

  if (j === m) {
    return i - m;
  }

  return -1;
}
