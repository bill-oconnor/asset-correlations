import React, { useEffect, useState } from "react";
import { TickerSearchResultsMenu } from "./TickerSearchResultsMenu";

import debounce from "lodash.debounce";
import {
  searchAutoCompleteTickers,
  loadDataForTicker,
  TickerInputData,
  TickerReturnsData,
} from "../../api";

import "./TickerSearchInput.scss";

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

type TickerSearchProps = {
  onTickerDataLoaded: (tickerData: TickerReturnsData) => void;
};

// TODO: change the name. it's confusing
export function TickerSearchControl(props: TickerSearchProps) {
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

  const tickerSearch = debounce(function () {
    searchAutoCompleteTickers(inputValue).then((results) => {
      /**
       * do we still have an input value?
       * Better would be to check a request id
       * Even better would be to manage this such that that isn't needed
       */
      if (inputValue) {
        autoCompleteTickerDataLoaded(results);
      } else {
        autoCompleteTickerDataLoaded([]);
      }
    });
  }, 500);

  // TODO: are state hooks syncronous?
  const tickerSearchEffect = function () {
    // new search, clear results
    setAutoCompleteTickerSuggestions([]);
    if (inputValue) {
      // set loading true
      setLoading(true);
      // search with state value
      tickerSearch();
    }
  };

  const windowEventsForSearchResultsMenuEffect = () => {
    function menuMgmtClickHandler() {
      setAutoCompleteTickerSuggestions([]);
    }
    if (autoCompleteTickerSuggestions && autoCompleteTickerSuggestions.length) {
      window.addEventListener("click", menuMgmtClickHandler);
    } else {
      window.removeEventListener("click", menuMgmtClickHandler);
    }
  };

  useEffect(tickerDataSelectedEffect, [selectedTickerData]);
  useEffect(tickerSearchEffect, [inputValue]);
  useEffect(windowEventsForSearchResultsMenuEffect, [
    autoCompleteTickerSuggestions,
  ]);

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

  function inputFocused() {
    if (
      inputValue &&
      (!autoCompleteTickerSuggestions || !autoCompleteTickerSuggestions.length)
    ) {
      tickerSearchEffect();
    }
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
        onFocus={() => inputFocused()}
        placeholder="Ticker"
      />
      <TickerSearchResultsMenu
        results={autoCompleteTickerSuggestions}
        onSelectTicker={onSelectTicker}
      />
    </div>
  );
}
