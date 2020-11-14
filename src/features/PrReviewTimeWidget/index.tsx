import React from "react";
import { getMetricByKey, getAverageValue } from "../../helpers/metricsData";
import { useMetricsData } from "../../contexts/MetricsContext";
import { IGroupedMetric } from "../../models/MetricData";
import { IKpiConfig } from "../../models/KpiConfig";
import { WidgetBase } from "../../components/WidgetBase";
import { formatNumber } from "../../helpers/numbers";
import { PrReviewTimeChart } from "./components/PrReviewTimeChart";

type PrReviewTimeWidgetProps = {
  dateFrom: string;
  dateTo: string;
  metricName: string;
};

export function PrReviewTimeWidget({
  dateFrom,
  dateTo,
  metricName,
}: PrReviewTimeWidgetProps) {
  let prReviewTime: IGroupedMetric[] = [];
  let average: number = 0;

  const { isLoading, data, error } = useMetricsData(dateFrom, dateTo, metricName);

  if (data) {
    prReviewTime = getMetricByKey(data, "date", convertSecondToHour);
    average = getAverageValue(prReviewTime);
  }

  const kpiConfig = createKpiConfig(average);

  return (
    <WidgetBase isLoading={isLoading} kpis={[kpiConfig]}>
      <PrReviewTimeChart data={prReviewTime} average={average} />
    </WidgetBase>
  );
}

function convertSecondToHour(value: number): number {
  return formatNumber(value / (60 * 60));
}

function createKpiConfig(value: number): IKpiConfig {
  return {
    name: "Average",
    value: value,
    unit: "hours",
  };
}
