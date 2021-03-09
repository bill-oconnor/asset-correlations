import React from "react";
import { TickerReturnsData } from "../../api";
import "./TickerDataDisplay.scss";

type TickerDataDisplayProps = {
  tickerData: TickerReturnsData | null;
};

// TODO: make sure the width does not change...
export function TickerDataDisplay(props: TickerDataDisplayProps) {
  const { tickerData } = props;
  if (!tickerData) return null;
  const {
    ticker,
    avgDailyReturn,
    sdDailyReturn,
    returnOverPeriod,
    sharpeRatio,
  } = tickerData;

  return (
    <div className="TickerDataDisplay">
      <span className="TickerDataDisplay--title">{ticker}</span>
      <div className="TickerDataDisplay--content">
        <div className="TickerDataDisplay--dataRow">
          <span className="TickerDataDisplay--dataRowLabel">
            average daily return
          </span>
          <span className="TickerDataDisplay--dataRowValue">
            {avgDailyReturn}
          </span>
        </div>
        <div className="TickerDataDisplay--dataRow">
          <span className="TickerDataDisplay--dataRowLabel">
            standard deviation of daily returns
          </span>
          <span className="TickerDataDisplay--dataRowValue">
            {sdDailyReturn}
          </span>
        </div>
        <div className="TickerDataDisplay--dataRow">
          <span className="TickerDataDisplay--dataRowLabel">
            return over entire period
          </span>
          <span className="TickerDataDisplay--dataRowValue">
            {returnOverPeriod}
          </span>
        </div>
        <div className="TickerDataDisplay--dataRow">
          <span className="TickerDataDisplay--dataRowLabel">Sharpe ratio</span>
          <span className="TickerDataDisplay--dataRowValue">{sharpeRatio}</span>
        </div>
      </div>
    </div>
  );
}
