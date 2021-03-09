import React from "react";

type TickerSearchResultProps = {
  result: any;
  selectTicker: (result: any) => void;
};
export function TickerSearchResult(props: TickerSearchResultProps) {
  const { result, selectTicker } = props;
  return (
    <li
      key={result.value}
      onClick={() => selectTicker(result)}
      className="TickerSearchInput--MenuItem"
    >
      <p>{result.label}</p>
      <p>{result.value}</p>
    </li>
  );
}
