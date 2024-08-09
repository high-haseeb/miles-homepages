"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", rents: 15000, fill: "#004537" },
  { month: "Feb", rents: 40000, fill: "#E9E454" },
  { month: "Mar", rents: 25000, fill: "#01AC4C" },
  { month: "Apr", rents: 5000, fill: "#FF8C2F" },
  { month: "May", rents: 3000, fill: "#004537" },
  { month: "Jun", rents: 15000, fill: "#E9E454" },
  { month: "Jul", rents: 20000, fill: "#01AC4C" },
  { month: "Aug", rents: 15000, fill: "#FF8C2F" },
  { month: "Sep", rents: 12500, fill: "#004537" },
  { month: "Oct", rents: 5000, fill: "#E9E454" },
  { month: "Nov", rents: 1000, fill: "#01AC4C" },
  { month: "Dec", rents: 30000, fill: "#FF8C2F" },
];

const chartConfig = {
  rents: {
    label: "Rents",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function DashboardChart() {
  return (
    <Card className="p-[30px] rounded-[25px]">
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="p-0">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              type="number"
              domain={[0, 50000]}
              interval={0}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="rents"
              fill="var(--color-rents)"
              radius={5}
              barSize={20}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
