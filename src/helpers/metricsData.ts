import _ from "lodash";

import { IMetricValue, IGroupedMetric } from "../models/MetricData";
import { IResponseData } from "../models/ResponseData";
import { formatNumber } from "./numbers";

export function transformMetricsData(
  responseData: IResponseData
): Map<string, IMetricValue[]> {
  const metricDataMap: Map<string, IMetricValue[]> = new Map();

  for (let calculatedItem of responseData.calculated) {
    const repoName = calculatedItem.for.repositories[0];

    for (let value of calculatedItem.values) {
      const date = value.date;

      for (let i = 0; i < responseData.metrics.length; i++) {
        const metricName = responseData.metrics[i];
        const metricValue = value.values[i];

        const processedMetricValue = metricProcessor(
          metricName,
          metricValue,
          repoName,
          date
        );

        const currentMetricData = metricDataMap.get(metricName);
        const newMetricData = [
          ...(currentMetricData || []),
          processedMetricValue,
        ] as IMetricValue[];

        metricDataMap.set(metricName, newMetricData);
      }
    }
  }

  return metricDataMap;
}

export function getMetricByKey(
  metrics: IMetricValue[],
  key: string,
  valueTransformer?: (value: number) => number
): IGroupedMetric[] {
  const grouped: IGroupedMetric[] = _.chain(metrics)
    // group by requested key
    .groupBy(key)
    // map to get only values from object and sum them
    .mapValues(function (v): number {
      return _.sumBy(v, "value");
    })
    // map item to convert it to IGroupedMetric object
    .map(function (value, key): IGroupedMetric {
      if (valueTransformer) {
        value = valueTransformer(value);
      }

      return { name: key, value };
    })
    .value();

  return grouped;
}

export function getAverageValue(groupedMetrics: IGroupedMetric[]) {
  const sum = _.sumBy(groupedMetrics, "value");

  return formatNumber(sum / groupedMetrics.length);
}

function metricProcessor(
  metricName: string,
  metricValue: string | number | null,
  repoName: string,
  date: string
): IMetricValue | null {
  switch (metricName) {
    case "pr-review-time":
      const value = metricValue ? parseInt(metricValue.toString()) : 0;

      return { date, repoName, value } as IMetricValue;
    case "pr-opened":
      return { date, repoName, value: metricValue || 0 } as IMetricValue;
    default:
      return null;
  }
}
