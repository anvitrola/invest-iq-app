import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

export default function Chart({ data }) {
  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="change" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis dataKey="change" />
      <Line
        type="monotone"
        dataKey="change"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
