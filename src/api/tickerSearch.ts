export type TickerInputData = {
  label: string;
  value: string;
};

export type TickerReturnsData = {
  ticker: string;
  avgDailyReturn: number;
  sdDailyReturn: number;
  returnOverPeriod: number;
  sharpeRatio: number;
};

const testAutoCompleteResults: TickerInputData[] = [
  {
    label: "AAPL",
    value: "AAPL-USAA",
  },
];
const testTickerData: TickerReturnsData = {
  ticker: "AAPL",
  avgDailyReturn: 0.024,
  sdDailyReturn: 0.01,
  returnOverPeriod: 0.1248,
  sharpeRatio: 2.4,
};

export function searchAutoCompleteTickers(
  inputText: string
): Promise<TickerInputData[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(testAutoCompleteResults), 800);
  });
}

export function loadDataForTicker(ticker: string): Promise<TickerReturnsData> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(testTickerData), 800);
  });
}
