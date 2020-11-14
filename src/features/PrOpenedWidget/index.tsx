import React from "react";
import { getMetricByKey, getAverageValue } from "../../helpers/metricsData";
import { useMetricsData } from "../../contexts/MetricsContext";
import { IGroupedMetric } from "../../models/MetricData";
import { IKpiConfig } from "../../models/KpiConfig";
import { WidgetBase } from "../../components/WidgetBase";
import { PrOpenedChart } from "./components/PrOpenedChart";

type PrReviewTimeWidgetProps = {
  dateFrom: string;
  dateTo: string;
  metricName: string;
};

export function PrOpenedWidget({
  dateFrom,
  dateTo,
  metricName,
}: PrReviewTimeWidgetProps) {
  let prOpened: IGroupedMetric[] = [];
  let average: number = 0;

  const { isLoading, data, error } = useMetricsData(dateFrom, dateTo, metricName);

  if (data) {
    prOpened = getMetricByKey(data, "repoName");
    average = getAverageValue(prOpened);
  }

  const kpiConfig = createKpiConfig(average);

  return (
    <WidgetBase isLoading={isLoading} kpis={[kpiConfig]}>
      <PrOpenedChart data={prOpened} />
    </WidgetBase>
  );
}

function createKpiConfig(value: number): IKpiConfig {
  return {
    name: "Average",
    value: value,
    unit: "prs/repo",
  };
}
