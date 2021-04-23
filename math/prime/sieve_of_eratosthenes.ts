export function sieveOfEratosthenes(maxValue: number): number[] {
  const flags = new Array(maxValue + 1).fill(true);
  flags[0] = false;
  flags[1] = false;

  for (let i = 2; i * i <= maxValue; i++) {
    for (let j = 2; i * j <= maxValue; j++) {
      flags[i * j] = false;
    }
  }

  return flags.reduce((list, value, index) => {
    if (value) {
      list.push(index);
    }
    
    return list;
  }, []);
}
