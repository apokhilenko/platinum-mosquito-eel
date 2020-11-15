import React, {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import axios from "../services/axios";
import { transformMetricsData } from "../helpers/metricsData";
import { IMetricValue } from "../models/MetricData";
import { IResponseData } from "../models/ResponseData";
import { settings } from "../settings";

export const MetricsContext = createContext<MetricsContextProps>({
  isDataLoading: false,
  initMetricsData: () => {},
  getMetricsData: () => {
    return undefined;
  },
  error: null,
});

/*
    NOTE: I implemented next provider because of two points:
    1. To show ability to work with custom composite hooks
    2. To decouple knowldge of possible metrics data from dashboard and give widgets possibility to be smart 
    and load required data. This will help if there will be more widgets that require data from this request.

    However, in real app and dashboard, that would have only two widgets that depends on this data, 
    I would simply load data in dashboard and pass it to widgets.
    Or, if app meant to be bigger, and have lot more widgets/data - to use state management library.
*/
export function MetricsProvider({ children }: { children: ReactNode }) {
  const url: string = process.env.REACT_APP_API_URL || "";
  // TODO: consider useReducer intead of set of useState
  const [data, setData] = useState<Map<string, IMetricValue[]>>(
    new Map<string, IMetricValue[]>()
  );
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  useEffect(
    function () {
      async function getData() {
        // map over repositories to prepare repogroups param. This needs to split response and have data for each repository
        const repogroups = settings.repositories.map(function (
          repoName,
          index
        ) {
          return [index];
        });

        let response;
        try {
          response = await axios.post(url, {
            for: [
              {
                repositories: settings.repositories,
                repogroups: repogroups,
              },
            ],
            metrics: settings.metrics,
            date_from: dateFrom,
            date_to: dateTo,
            granularities: [settings.granularity],
            exclude_inactive: true,
            account: settings.account,
            timezone: settings.timezone,
          });
          const responseData: IResponseData = response && response.data;
          const data = transformMetricsData(responseData);

          setData(data);
        } catch (e) {
          setError("Can't get metrics.");
        }

        setIsDataLoading(false);
      }

      if (dateFrom && dateTo) {
        setIsDataLoading(true);
        getData();
      }
    },
    [dateFrom, dateTo, url]
  );

  function initMetricsData(dateFrom: string, dateTo: string) {
    setDateFrom(dateFrom);
    setDateTo(dateTo);
  }

  function getMetricsData(key: string) {
    return data.get(key);
  }

  return (
    <MetricsContext.Provider
      value={{ initMetricsData, getMetricsData, isDataLoading, error }}
    >
      {children}
    </MetricsContext.Provider>
  );
}

export function useMetricsData(dateFrom: string, dateTo: string, key: string) {
  const { initMetricsData, getMetricsData, isDataLoading, error } = useContext<
    MetricsContextProps
  >(MetricsContext);

  useEffect(
    function () {
      initMetricsData(dateFrom, dateTo);
    },
    [dateFrom, dateTo, initMetricsData]
  );

  return { isLoading: isDataLoading, data: getMetricsData(key), error };
}

type MetricsContextProps = {
  initMetricsData: (dateFrom: string, dateTo: string) => void;
  getMetricsData: (key: string) => IMetricValue[] | undefined;
  isDataLoading: boolean;
  error: string | null;
};
