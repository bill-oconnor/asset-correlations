import React, { useEffect, useState } from "react";
import { TickerSearchResultsMenu } from "./TickerSearchResultsMenu";

import debounce from "lodash.debounce";
import {
  searchAutoCompleteTickers,
  loadDataForTicker,
  TickerInputData,
  TickerReturnsData,
} from "../../api";

import "./TextSearchInput.scss";

/**
 *
 * When the input value changes, it should search and return a list for a dropdown
 * When the user clicks a value in the dropdown, it will replace the in the input and search a different endpoint for returns data
 * This component just manages the state of the thing, but will pass results back to its parent
 *
 * When this component finishes loading the data, it should update the parent with the data
 * The input is loading while it requests data for the selected ticker or while the list loads
 *  it is not disabled while it loads the list. it is while it loads the ticker symbol data
 */

type TickerSearchInputProps = {
  onTickerDataLoaded: (tickerData: TickerReturnsData) => void;
};

// TODO: change the name. it's confusing
export function TickerSearchInput(props: TickerSearchInputProps) {
  const { onTickerDataLoaded } = props;

  const [inputValue, setInputValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [
    autoCompleteTickerSuggestions,
    setAutoCompleteTickerSuggestions,
  ] = useState<TickerInputData[]>([]);
  const [
    selectedTickerData,
    setSelectedTickerData,
  ] = useState<TickerInputData | null>(null);

  const tickerDataSelectedEffect = () => {
    if (selectedTickerData) {
      // TODO: is this bad?
      // update the UI
      setInputValue("");
      setAutoCompleteTickerSuggestions([]);
      setLoading(true);
      // load the ticker data
      loadDataForTicker(selectedTickerData.value).then(
        selectedTickerDataLoaded
      );
    }
  };

  // TODO: are state hooks syncronous?
  const autoCompleteTickerSearchEffect = debounce(function () {
    if (inputValue) {
      // set loading true
      setLoading(true);
      // search with state value
      searchAutoCompleteTickers(inputValue).then((results) => {
        autoCompleteTickerDataLoaded(results);
      });
    } else {
      autoCompleteTickerDataLoaded([]);
    }
  }, 500);

  useEffect(tickerDataSelectedEffect, [selectedTickerData]);
  useEffect(autoCompleteTickerSearchEffect, [inputValue]);

  function autoCompleteTickerDataLoaded(searchResults: TickerInputData[]) {
    // update with results
    setAutoCompleteTickerSuggestions(searchResults);
    // set loading false
    setLoading(false);
  }

  function selectedTickerDataLoaded(tickerData: TickerReturnsData) {
    // after loaded, then alert the parent
    onTickerDataLoaded(tickerData);
    setLoading(false);
  }

  // TODO: review how classes and functions / arrow functions work with "this"
  // TODO: functions like this need to be named onSelectTicker, not selectTicker
  async function onSelectTicker(tickerInputData: TickerInputData) {
    setSelectedTickerData(tickerInputData);
  }

  function inputValueChanged(value: string) {
    setInputValue(value);
  }

  // TODO: how to manage typescript
  const inputText = selectedTickerData ? selectedTickerData.label : inputValue;

  // TODO: how to manage loading class in BEM
  return (
    <div className={`TickerSearchInput ${loading ? "Loading" : ""}`}>
      <input
        className="TickerSearchInput--input"
        value={inputText}
        onChange={(e) => inputValueChanged(e.target.value)}
        placeholder="Ticker"
      />
      <TickerSearchResultsMenu
        results={autoCompleteTickerSuggestions}
        onSelectTicker={onSelectTicker}
      />
    </div>
  );
}
