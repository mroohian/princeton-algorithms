function  permutationRecursive(value: string, prefix: string): string[] {
  if (value.length == 0) {
    return [prefix];
  }

  const results: string[] = [];
  for (let i= 0; i < value.length; i++) {
    const rem = value.substring(0, i) + value.substring(i + 1);

    results.push(...permutationRecursive(rem, prefix + value.charAt(i)));
  }

  return results;
}

export function stringPermutation(value: string): string[] {
  return permutationRecursive(value, '');
}

