import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { IColorable, IGroupedMetric } from "../../../models/MetricData";

type PrOpenedChartProps = {
  data: (IGroupedMetric & IColorable)[];
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
        <Bar name="PRs opened" dataKey="value" maxBarSize={50}>
          {data.map((entry) => {
            return <Cell fill={entry.color} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
