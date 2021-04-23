export interface Item {
  weight: number;
  value: number;
}

export interface Result {
  maxValue: number;
  items: Item[];
}

function knapsackRecursive(
  index: number,
  capacity: number,
  items: Item[],
  cache: Record<string, Result>
): Result {
  if (index < 0 || capacity === 0) {
    return { maxValue: 0, items: [] };
  }

  const cacheKey = `${index}_${capacity}`;
  const cacheValue = cache[cacheKey];
  if (cacheValue !== undefined) {
    return cacheValue;
  }

  const excludeResult = knapsackRecursive(index - 1, capacity, items, cache);

  const item = items[index];

  if (item.weight > capacity) {
    cache[cacheKey] = excludeResult;

    return excludeResult;
  }

  const tmp = knapsackRecursive(
    index - 1,
    capacity - item.weight,
    items,
    cache
  );

  const includeResult: Result = {
    maxValue: tmp.maxValue + item.value,
    items: [...tmp.items, { ...item }],
  };

  const result =
    excludeResult.maxValue > includeResult.maxValue
      ? excludeResult
      : includeResult;

  cache[cacheKey] = result;

  return result;
}

export function knapsack(items: Item[], capacity: number): Result {
  return knapsackRecursive(items.length - 1, capacity, items, {});
}
