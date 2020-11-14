import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { IGroupedMetric } from "../../../models/MetricData";

type PrOpenedChartProps = {
  data: IGroupedMetric[];
};

export function PrOpenedChart({ data }: PrOpenedChartProps) {
  return (
    <ResponsiveContainer>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" name="Date" />
        <YAxis
          label={{ value: "PRs opened", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Bar name="PRs opened" dataKey="value" fill="#8884d8" maxBarSize={50} />
      </BarChart>
    </ResponsiveContainer>
  );
}
