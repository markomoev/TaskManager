import Sidebar from "../../components/global/sidebar/Sidebar"
import Topbar from "../../components/global/topbar/Topbar"

//charts
import { ChartAreaInteractive as AreaChart } from "../../components/progress/AreaChart"
import { ChartPieInteractive as PieChart } from "../../components/progress/PieChart"
import { ChartRadialStacked as RadialChart } from "../../components/progress/RadialChart"

export default function ProgressPage(){
  return(
    <div className="flex flex-col-reverse md:flex-row h-screen w-full overflow-hidden">
      <Sidebar />

      <div className="flex flex-col h-full w-full flex-1 overflow-y-auto pb-20 md:pb-0"> 
        <Topbar />

        <div className="flex flex-col gap-6 md:gap-10 items-center justify-start md:justify-center w-full px-4 md:px-8 pb-4 h-full md:mt-2">
            <div className="w-full max-w-8xl flex-none md:flex-1 md:min-h-0 min-h-[300px]">
                <AreaChart/>
            </div>

            <div className="w-full flex-none md:flex-1 md:min-h-0 flex flex-col md:flex-row gap-4 mb-4 md:mb-0">
              <div className="w-full md:w-1/2 h-80 md:h-full mb-9 md:mb-0">
                <PieChart/>
              </div>
              <div className="w-full md:w-1/2 h-80 md:h-full mb-25 md:mb-0">
                <RadialChart />
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}