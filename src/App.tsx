import React from "react";
import { ThemeProvider } from "styled-components";
import { MetricsProvider } from "./contexts/MetricsContext";
import { Dashboard } from "./features/Dashboard";
import { theme, GlobalStyle } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MetricsProvider>
        <Dashboard />
      </MetricsProvider>
    </ThemeProvider>
  );
}

export default App;
