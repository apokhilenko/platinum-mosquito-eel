import React from "react";
import { Tabs, TabPanel } from "../../components/Tabs";
import { PrReviewTimeWidget } from "../PrReviewTimeWidget";
import { PrOpenedWidget } from "../PrOpenedWidget";

const config = [
  { name: "PR opened", metricName: "pr-opened", widget: PrOpenedWidget },
  { name: "PR review", metricName: "pr-review-time", widget: PrReviewTimeWidget },
];

export function Dashboard() {
  const tabNames = config.map(function ({ name }) {
    return name;
  });

  return (
    <Tabs tabNames={tabNames} renderHeader={() => {}}>
      {config.map(function (configItem) {
        const Component = configItem.widget;

        return (
          <TabPanel key={configItem.name}>
            <Component
              dateFrom="2020-06-01"
              dateTo="2020-09-01"
              metricName={configItem.metricName}
            />
          </TabPanel>
        );
      })}
    </Tabs>
  );
}
