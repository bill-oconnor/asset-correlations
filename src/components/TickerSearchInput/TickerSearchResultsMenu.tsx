import React from "react";
import { TickerSearchResult } from "./TickerSearchResult";

type TickerSearchResultsMenuProps = {
  onSelectTicker: (tickerData: any) => void;
  results: any[];
};

// TODO: what is the difference between the options here: a component, an HOC, and a function that is called and returns the jsx?
// TODO: how to show empty state (without annoyingly showing it before search is complete)
// TODO: make this go away when a click is registered...
export function TickerSearchResultsMenu(props: TickerSearchResultsMenuProps) {
  const { results, onSelectTicker } = props;

  return results.length === 0 ? null : (
    <div className="TickerSearchInput--Menu">
      <ul>
        {results.map((r) => (
          <TickerSearchResult
            selectTicker={onSelectTicker}
            result={r}
          ></TickerSearchResult>
        ))}
      </ul>
    </div>
  );
}
