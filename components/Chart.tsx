"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const Chart = ({ used = 0 }: { used: number }) => {
  const chartData = [{ storage: "used", 10: used, fill: "white" }];

  return (
    <Card className="flex items-center rounded-[20px] bg-[#FA7275] p-5 text-white md:flex-col xl:flex-row !important">
      <CardContent className="flex-1 p-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square w-[180px] text-white xl:w-[250px] !important">
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={Number(calculatePercentage(used)) + 90}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="polar-grid"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="storage" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-4xl font-bold !important"
                        >
                          {used && calculatePercentage(used)
                            ? calculatePercentage(used)
                                .toString()
                                .replace(/^0+/, "")
                            : "0"}
                          %
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white/70"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardHeader className="flex-1 items-start px-3 py-0 sm:px-5 lg:p-3 xl:pr-5 !important">
        <CardTitle className=" h3 font-bold md:text-center lg:text-left !important">Available Storage</CardTitle>
        <CardDescription className="text-[16px] leading-[24px] font-medium mt-2 w-full text-white/70 md:text-center lg:text-left !important">
          {used ? convertFileSize(used) : "2GB"} / 2GB
        </CardDescription>
      </CardHeader>
    </Card>
  );
};