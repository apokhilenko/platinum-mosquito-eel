import _ from "lodash";
import { METRIC_PR_OPENED, METRIC_PR_REVIEW_TIME } from "../constants/metrics";

import { IMetricValue, IGroupedMetric } from "../models/MetricData";
import { IResponseData } from "../models/ResponseData";
import { formatNumber } from "./numbers";

export function transformMetricsData(
  responseData: IResponseData
): Map<string, IMetricValue[]> {
  const metricDataMap: Map<string, IMetricValue[]> = new Map();

  // loop over calculated data from response
  for (let calculatedItem of responseData.calculated) {
    // get repository name
    const repoName = calculatedItem.for.repositories[0];

    // loop over specific calculated item
    for (let value of calculatedItem.values) {
      // get date
      const date = value.date;

      // loop over requested metrics
      for (let i = 0; i < responseData.metrics.length; i++) {
        // get metric name
        const metricName = responseData.metrics[i];
        // get metric value - value in values array have same index as metric in metrics array
        const metricValue = value.values[i];

        // process data to get metric value
        const processedMetricValue: IMetricValue | null = metricProcessor(
          metricName,
          metricValue,
          repoName,
          date
        );

        // get data for current metric from map
        const currentMetricData = metricDataMap.get(metricName);
        // create array of current metric data + just processed metric data
        const newMetricData = [
          ...(currentMetricData || []),
          processedMetricValue,
        ] as IMetricValue[];

        // set in map new metric data by metric name
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

export function getAverageValue(groupedMetrics: IGroupedMetric[]): number {
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
    case METRIC_PR_REVIEW_TIME:
      // for pr review time format of data is "{number}s", so we need to extract that number
      // possible, that in future, there will be not only "s" for seconds, but other units, so this case should be enhanced
      const value = metricValue ? parseInt(metricValue.toString()) : 0;

      return { date, repoName, value } as IMetricValue;
    case METRIC_PR_OPENED:
      return { date, repoName, value: metricValue || 0 } as IMetricValue;
    default:
      return null;
  }
}
