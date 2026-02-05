"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import usePieChartData, { type PieChartDataPoint } from "@/hooks/progress/usePieChartData"

export const description = "An interactive pie chart"

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "var(--chart-1)",
  },
  february: {
    label: "February",
    color: "var(--chart-2)",
  },
  march: {
    label: "March",
    color: "var(--chart-3)",
  },
  april: {
    label: "April",
    color: "var(--chart-4)",
  },
  may: {
    label: "May",
    color: "var(--chart-5)",
  },
  june: {
    label: "June",
    color: "var(--chart-1)",
  },
  july: {
    label: "July",
    color: "var(--chart-2)",
  },
  august: {
    label: "August",
    color: "var(--chart-3)",
  },
  september: {
    label: "September",
    color: "var(--chart-4)",
  },
  october: {
    label: "October",
    color: "var(--chart-5)",
  },
  november: {
    label: "November",
    color: "var(--chart-1)",
  },
  december: {
    label: "December",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartPieInteractive() {
  const id = "pie-interactive"
  const { data: chartData } = usePieChartData()
  const [activeMonth, setActiveMonth] = React.useState("january")

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item: PieChartDataPoint) => item.month === activeMonth),
    [activeMonth, chartData]
  )
  
  const months = React.useMemo(() => chartData.map((item: PieChartDataPoint) => item.month), [chartData]) 

  if (chartData.length === 0) {
    return <Card className="flex flex-col h-full bg-[oklch(16.5%_0_0)] items-center justify-center p-6 text-muted-foreground">Loading chart data...</Card>
  }

  return (
    <Card data-chart={id} className="flex flex-col h-full bg-[oklch(16.5%_0_0)] pb-80 md:pb-0">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Number of hustles</CardTitle>
          <CardDescription>Monthly Breakdown</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {months.map((key: string) => {
              const config = chartConfig[key as keyof typeof chartConfig]

              if (!config) {
                return null
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-xs"
                      style={{
                        backgroundColor: `var(--color-${key})`,
                      }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="desktop"
              nameKey="month"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: any) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
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
                          {chartData[activeIndex]?.desktop.toLocaleString() || 0}
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
