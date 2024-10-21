"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart() {
  const data = [
    {
      name: "mon",
      visit: 2000,
      click: 3000,
    },
    {
      name: "tue",
      visit: 4000,
      click: 5000,
    },
    {
      name: "wed",
      visit: 1700,
      click: 1600,
    },
    {
      name: "thu",
      visit: 3000,
      click: 3000,
    },
    {
      name: "fri",
      visit: 2970,
      click: 3000,
    },
    {
      name: "sat",
      visit: 2000,
      click: 2600,
    },
    {
      name: "sun",
      visit: 1400,
      click: 300,
    },
  ];
  return (
    <div className=" h-96">
      <h2 className="p-5 capitalize font-medium">weekly recap</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ background: "#151c2c", border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="click" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
