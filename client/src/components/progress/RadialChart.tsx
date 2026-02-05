"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import useRadialChartData from "@/hooks/progress/useRadialChartData"
import { useMemo } from "react"

export const description = "A radial chart with stacked sections"

const chartConfig = {
  completed: {
    label: "Completed",
    color: "#34d399", // emerald-400
  },
  active: {
    label: "Active",
    color: "#f59e0b", // amber-500
  },
  paused: {
    label: "Paused",
    color: "#a1a1aa", // zinc-400
  },
} satisfies ChartConfig

export function ChartRadialStacked() {
  const { data: chartData } = useRadialChartData()

  // Calculate total hustles safely
  const totalHustles = useMemo(() => {
     return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData])

  if (chartData.length === 0) {
     return (
        <Card className="flex flex-col h-full bg-[oklch(16.5%_0_0)] items-center justify-center p-6 text-muted-foreground">
            Loading chart data...
        </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full bg-[oklch(16.5%_0_0)] pb-80 md:pb-0">
      <CardHeader className="items-center pb-0">
        <CardTitle>Hustle Statuses</CardTitle>
        <CardDescription>Status Distribution</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
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
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalHustles.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Hustles
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
