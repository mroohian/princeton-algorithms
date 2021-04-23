export function stockPriceBuySignal(prices: number[]): number {
  let maxProfit = 0;

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];

    if (diff > 0) {
      maxProfit += diff;
    }
  }

  return maxProfit;
}