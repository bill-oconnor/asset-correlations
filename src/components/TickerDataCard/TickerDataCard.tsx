import React, { useState } from "react";
import { TickerSearchControl } from "../TickerSearchControl";
import { TickerDataDisplay } from "../TickerDataDisplay";
import { Card } from "../_layouts";
import "./TickerDataCard.scss";
import { TickerReturnsData } from "../../api";
/**
 *
 * When this card doesn't have a ticker set and loaded, it should show the input field
 * Otherwise, it should show the data that it has. So the states are empty and loaded
 * use React CSS transition group to transition between states
 * This component will provide the search function details to the input
 *
 */
// TODO: how to coordinate across components for my slick animation?
// TODO: the coordination is the transition - the positioning of the title maybe should be shared...
// it should paint the Data display before removing the input
export function TickerDataCard(props: any) {
  const [tickerData, setTickerData] = useState<TickerReturnsData | null>(null);

  return (
    <Card className="TickerDataCard">
      {tickerData ? (
        <>
          <TickerDataDisplay tickerData={tickerData} />
          <button
            className="Button-tertiary"
            onClick={() => setTickerData(null)}
          >
            Clear
          </button>
        </>
      ) : (
        <TickerSearchControl
          onTickerDataLoaded={setTickerData}
        ></TickerSearchControl>
      )}
    </Card>
  );
}
