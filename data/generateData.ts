export function generateData(n: number, min = 0, max = 100, unique = false): number[] {
  if (unique && (max - min + 1) < n) {
    throw new Error(`Not enough values between ${min} and ${max} to generate ${n} unique values`);
  }

  const values = [Number.MIN_SAFE_INTEGER];
  const generateUniqueValue = () => {
    let value = Number.MIN_SAFE_INTEGER;
   
    while (values.includes(value)) {
      value = Math.trunc(min + Math.random() * (max - min + 1));
    }
    values.push(value);

    return value;
  };

  const generateValue = () => Math.trunc(min + Math.random() * (max - min + 1));

  if (typeof n !== 'number' || n < 1) {
    throw new Error('Invalid input length');
  }

  return [...Array(n)].map(unique ? generateUniqueValue : generateValue);
}

export function generateDataSorted(n: number, min = 0, max = 100, unique = false): number[] {
  return generateData(n, min, max, unique).sort((a, b) => a - b);
}

export function generateDataReverseSorted(n: number, min = 0, max = 100, unique = false): number[] {
  return generateData(n, min, max, unique).sort((a, b) => b - a);
}
