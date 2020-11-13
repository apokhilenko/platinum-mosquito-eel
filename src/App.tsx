import React from "react";
import { ThemeProvider } from "styled-components";
import { PrOpenedWidget } from "./features/PrOpenedWidget";
import { theme, GlobalStyle } from "./theme";

const data = {
  dateFrom: "2020-06-01",
  dateTo: "2020-09-01",
  metricName: "pr-review-time",
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PrOpenedWidget {...data} />
    </ThemeProvider>
  );
}

export default App;
