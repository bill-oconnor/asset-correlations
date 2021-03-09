import React from "react";
import "./TickerSearchResultsMenu.scss";

type TickerSearchResultProps = {
  result: any;
  selectTicker: (result: any) => void;
};
export function TickerSearchResult(props: TickerSearchResultProps) {
  const { result, selectTicker } = props;
  const onClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectTicker(result);
  };

  return (
    <li
      key={result.value}
      onClick={onClick}
      className="TickerSearchResultsMenu--Item"
    >
      <p>
        {result.label} - {result.value}
      </p>
    </li>
  );
}
