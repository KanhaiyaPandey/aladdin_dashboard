import React from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Graphs = () => {
  const data = [
    {
      name: "18-24",
      uv: 3147,
      pv: 2400,
      fill: "#8884d8",
    },
    {
      name: "25-29",
      uv: 2669,
      pv: 4567,
      fill: "#83a6ed",
    },
    {
      name: "30-34",
      uv: 1569,
      pv: 1398,
      fill: "#8dd1e1",
    },
    {
      name: "35-39",
      uv: 822,
      pv: 9800,
      fill: "#82ca9d",
    },
    {
      name: "40-49",
      uv: 1200,
      pv: 3908,
      fill: "#a4de6c",
    },
    {
      name: "50+",
      uv: 2630,
      pv: 4800,
      fill: "#d0ed57",
    },
    {
      name: "unknow",
      uv: 2067,
      pv: 4800,
      fill: "#ffc658",
    },
  ];

  return (
    <main className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2 mt-10 gap-4 w-full h-1/2 p-4 ">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pv"
            fill="pink"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="uv"
            fill="gold"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>

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
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </main>
  );
};

export default Graphs;
