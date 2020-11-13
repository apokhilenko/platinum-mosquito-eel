import { useEffect, useState } from "react";
import { transformMetricsData } from "../helpers/metricsData";
import { IMetricValue } from "../models/MetricData";
import { IResponseData } from "../models/ResponseData";
import axios from "../services/axios";

// TODO: this data to settings
const URL = "https://api.athenian.co/v1/metrics/prs";
const ACCOUNT = 1;
const TIMEZONE = 60;
const REPOSITORIES = [
  "github.com/athenianco/athenian-api",
  "github.com/athenianco/athenian-webapp",
  "github.com/athenianco/infrastructure",
  "github.com/athenianco/metadata",
];
const METRICS = ["pr-review-time", "pr-opened"];
const GRANULARITY = "day";

export function useMetricsData(
  dateFrom: string,
  dateTo: string,
  key: string,
  granularity: string = GRANULARITY
) {
  const [data, setData] = useState<Map<string, IMetricValue[]>>(
    new Map<string, IMetricValue[]>()
  );
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(
    function () {
      async function getData() {
        // map over repositories to prepare repogroups param. This needs to split response and have data for each repository
        const repogroups = REPOSITORIES.map(function (repoName, index) {
          return [index];
        });

        const response = await axios.post(URL, {
          for: [
            {
              repositories: REPOSITORIES,
              repogroups: repogroups,
            },
          ],
          metrics: METRICS,
          date_from: dateFrom,
          date_to: dateTo,
          granularities: [granularity],
          exclude_inactive: true,
          account: ACCOUNT,
          timezone: TIMEZONE,
        });

        const responseData: IResponseData = response.data;
        const data = transformMetricsData(responseData);

        setData(data);
        setIsDataLoading(false);
      }

      setIsDataLoading(true);
      getData();
    },
    [dateFrom, dateTo, granularity]
  );

  return { isLoading: isDataLoading, data: data.get(key) };
}
