import React from "react";
import "./App.scss";
import { ContentGrid, CorrelationDataCard, TickerDataCard } from "./components";

// TODO: needs an h1
// TODO: needs a period selection - in redux\
function App() {
  return (
    <div className="App">
      <h1>Asset Correlations</h1>
      <ContentGrid>
        <div>
          <TickerDataCard />
        </div>
        <div>
          <TickerDataCard />
        </div>
        <CorrelationDataCard className="Grid-fullWidth" />
      </ContentGrid>
    </div>
  );
}

export default App;
