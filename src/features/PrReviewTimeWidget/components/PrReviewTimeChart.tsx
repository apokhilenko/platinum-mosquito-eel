import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { IGroupedMetric } from "../../../models/MetricData";

type PrReviewTimeChartProps = {
  data: IGroupedMetric[];
  average: number;
};

export function PrReviewTimeChart({ data, average }: PrReviewTimeChartProps) {
  const interval = calculateTickInterval(data.length);

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          name="Date"
          interval={interval}
          angle={-30}
          dx={-30}
          dy={20}
          height={55}
        />
        <YAxis
          label={{ value: "PRs review time", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <ReferenceLine y={average} label="Average" stroke="red" />
        <Line
          name="PR review time in hours"
          type="linear"
          dataKey="value"
          stroke="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function calculateTickInterval(length: number): number {
  if (length > 60) {
    return 3;
  } else if (length > 40) {
    return 1;
  } else {
    return 0;
  }
}
