"use client";

import { useState } from "react";
import { withAuth } from "@/components/hoc";
import { PageHeader, UploadCsvModal } from "@/components";
import Paper from "@mui/material/Paper";
import { PieChart } from "@mui/x-charts/PieChart";
import { ExcelIcon } from "@/constants/assets";

import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"];

export function valueFormatter(value) {
  return `${value}mm`;
}

const Dashboard = () => {
  const [openUploadModal, setOpenUploadModal] = useState(false);

  const handleOpenModal = () => setOpenUploadModal(true);
  const handleCloseModal = () => setOpenUploadModal(false);

  return (
    <>
      <PageHeader
        text="Home"
        buttonText="Upload CSV"
        onButtonClick={handleOpenModal}
        icon={<ExcelIcon height={30} width={30} />}
      />
      <Paper elevation={3} className="mt-5 p-10">
        <div className="flex flex-wrap gap-5 flex-col md:flex-row">
          {/* Left Column */}
          <div className="flex-1 min-w-[250px]  ">
            <Paper className="p-4">
              <h2 className="text-xl mb-3">Sales Trend Analysis</h2>
              <LineChart
                width={500}
                height={300}
                series={[
                  { data: pData, label: "Online", id: "pvId" },
                  { data: uData, label: "In-Store", id: "uvId" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
                sx={{
                  [`.${lineElementClasses.root}, .${markElementClasses.root}`]:
                    {
                      strokeWidth: 1,
                    },
                  ".MuiLineElement-series-pvId": {
                    strokeDasharray: "5 5",
                  },
                  ".MuiLineElement-series-uvId": {
                    strokeDasharray: "3 4 5 2",
                  },
                  [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
                    {
                      fill: "#fff",
                    },
                  [`& .${markElementClasses.highlighted}`]: {
                    stroke: "none",
                  },
                }}
              />
              <h3 className="text-base mb-3">
                <span style={{ color: "#005B96" }}>Market Trend Analysis:</span>{" "}
                A Step-by-Step Process Success
              </h3>
            </Paper>
          </div>

          {/* Right Column */}
          <div className="flex-1 min-w-[250px] flex-col ">
            <Paper className="p-4">
              <h2 className="text-xl mb-3">
                Total Purchasing in San Francisco, CA
              </h2>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                width={500}
                height={300}
              />
              <h3 className="text-base mb-3">
                <span style={{ color: "#005B96" }}>Insights:</span> Unlocking
                Market Potential and Growth
              </h3>
            </Paper>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 mt-12 flex-col  md:flex-row">
          {/* Left Column */}
          <div className="flex-1 min-w-[250px] sm:w-full md:w-1/2">
            <Paper className="p-4">
              <h2 className="text-xl mb-3">Purchases Analytics</h2>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
                series={[
                  {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    valueFormatter: (value) =>
                      value == null ? "NaN" : value.toString(),
                  },
                  {
                    data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
                  },
                  {
                    data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
                    valueFormatter: (value) =>
                      value == null ? "?" : value.toString(),
                  },
                ]}
                height={200}
                margin={{ top: 10, bottom: 20 }}
              />
              <h3 className="text-base mt-5">
                <span style={{ color: "#005B96" }}>Analytics:</span> A Deep Dive
                into Consumer Behavior
              </h3>
            </Paper>
          </div>

          {/* Right Column */}
          <div className="flex-1 min-w-[250px] sm:w-full md:w-1/2">
            <Paper className="p-4">
              <h2 className="text-xl mb-3">Purchased By City</h2>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "Los Angeles" },
                      { id: 1, value: 15, label: "New York City" },
                      { id: 2, value: 15, label: "Chicago" },
                      { id: 3, value: 20, label: "San Diego" },
                      { id: 4, value: 5, label: "Other" },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
              <h3 className="text-base mt-5">
                <span style={{ color: "#005B96" }}>Insights:</span> Overview of
                Purchases Across Different Locations
              </h3>
            </Paper>
          </div>
        </div>
      </Paper>
      <UploadCsvModal open={openUploadModal} handleClose={handleCloseModal} />
    </>
  );
};
export default withAuth(Dashboard);
