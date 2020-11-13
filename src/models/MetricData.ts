export interface IMetricData {
  name: string;
  values: IMetricValue[];
}

export interface IMetricValue {
  date: string;
  repoName: string;
  value: number | null;
}

export interface IGroupedMetric {
  name: string;
  value: number;
}
