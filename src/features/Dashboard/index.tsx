import React from "react";
import { Tabs, TabPanel } from "../../components/Tabs";
import { PrReviewTimeWidget } from "../PrReviewTimeWidget";
import { PrOpenedWidget } from "../PrOpenedWidget";
import { DatePicker } from "../../components/DatePicker";
import { useUrlState } from "../../hooks/useUrlState";
import { settings } from "../../settings";
import { Layout } from "../../components/Layout";

const config = [
  { name: "PR opened", metricName: "pr-opened", widget: PrOpenedWidget },
  {
    name: "PR review",
    metricName: "pr-review-time",
    widget: PrReviewTimeWidget,
  },
];

export function Dashboard() {
  const [dateFromUrl, updateDateFromUrl] = useUrlState("dateFrom");
  const [dateToUrl, updateDateToUrl] = useUrlState("dateTo");

  const dateFrom = dateFromUrl || settings.initialDateFrom;
  const dateTo = dateToUrl || settings.initialDateTo;

  const tabNames = config.map(function ({ name }) {
    return name;
  });

  function handleDateChange(startDate: string, endDate: string) {
    updateDateFromUrl(startDate);
    updateDateToUrl(endDate);
  }

  return (
    <Layout>
      <Tabs
        tabNames={tabNames}
        renderHeader={function () {
          return (
            <DatePicker
              startDate={dateFrom}
              endDate={dateTo}
              onDateChange={handleDateChange}
            />
          );
        }}
      >
        {config.map(function (configItem) {
          const Component = configItem.widget;

          return (
            <TabPanel key={configItem.name}>
              <Component
                dateFrom={dateFrom}
                dateTo={dateTo}
                metricName={configItem.metricName}
              />
            </TabPanel>
          );
        })}
      </Tabs>
    </Layout>
  );
}
