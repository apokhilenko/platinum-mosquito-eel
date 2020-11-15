import React, { useMemo } from "react";
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
  const { isLoading, data, error } = useMetricsData(
    dateFrom,
    dateTo,
    metricName
  );

  const { prOpened, average } = useMemo(
    function () {
      let prOpened: IGroupedMetric[] = [];
      let average: number = 0;

      if (data) {
        prOpened = getMetricByKey(data, "repoName");
        average = getAverageValue(prOpened);
      }
      return { prOpened, average };
    },
    [data]
  );

  const kpiConfig = createKpiConfig(average);

  return (
    <WidgetBase isLoading={isLoading} kpis={[kpiConfig]} errorMessage={error}>
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
