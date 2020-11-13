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

type PrOpenedChartProps = {
  data: IGroupedMetric[];
  average: number;
};

export function PrOpenedChart({ data, average }: PrOpenedChartProps) {
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
          interval={3}
          angle={-30}
          dx={-30}
          dy={20}
          height={55}
        />
        <YAxis
          label={{ value: "Review time", angle: -90, position: "insideLeft" }}
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
