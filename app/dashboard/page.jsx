"use client";

import withLayout from "@/components/hoc/withLayout";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { ExcelIcon } from "@/constants/assets";
import {
  ADMIN_CLIENT_COUNTERS_DATA,
  ADMIN_TEAM_COUNTERS_DATA,
  TEAM_COUNTERS_DATA,
} from "@/constants";

// material-ui
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { DUMMY_DATA } from "@/constants/dummyData";

// project import
import {
  AnalyticEcommerce,
  MainCard,
  MonthlyBarChart,
  ReportAreaChart,
  UniqueVisitorCard,
  SaleReportCard,
  OrdersTable,
  PageHeader,
  UploadCsvModal,
} from "@/components";

import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { PieChart } from "@mui/x-charts/PieChart";

// assets
import GiftOutlined from "@ant-design/icons/GiftOutlined";
import MessageOutlined from "@ant-design/icons/MessageOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";

const Dashboard = () => {
  const role_id = useSelector((state) => state?.auth?.role_id);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [data, setData] = useState(null);

  const handleOpenModal = () => setOpenUploadModal(true);
  const handleCloseModal = () => setOpenUploadModal(false);

  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <PageHeader
            text="Home"
            buttonText="Upload CSV"
            onButtonClick={handleOpenModal}
            icon={<ExcelIcon height={30} width={30} />}
          />
        </Grid>

        {role_id === 1 && (
          <>
            {ADMIN_CLIENT_COUNTERS_DATA.map((counterObj, i, arr) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={`${counterObj.title}-${i}`}
                >
                  <AnalyticEcommerce
                    title={counterObj.title}
                    count={counterObj.counts}
                    description={counterObj.description}
                  />
                </Grid>
              );
            })}

            {ADMIN_TEAM_COUNTERS_DATA.map((counterObj, i, arr) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={`${counterObj.title}-${i}`}
                >
                  <AnalyticEcommerce
                    title={counterObj.title}
                    count={counterObj.counts}
                    description={counterObj.description}
                  />
                </Grid>
              );
            })}
          </>
        )}

        {role_id === 2 &&
          TEAM_COUNTERS_DATA.map((counterObj, i, arr) => {
            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={`${counterObj.title}-${i}`}
              >
                <AnalyticEcommerce
                  title={counterObj.title}
                  count={counterObj.counts}
                  description={counterObj.description}
                />
              </Grid>
            );
          })}

        <Grid
          item
          md={8}
          sx={{ display: { sm: "none", md: "block", lg: "none" } }}
        />

        {data?.insights?.map((obj, i, arr) => {
          return (
            <Fragment key={i}>
              {["line", "bar", "pie"].includes(
                obj?.visualization?.chart_type
              ) && (
                <Grid item xs={12} md={12} lg={6} key={i}>
                  <MainCard
                    content={false}
                    sx={{ mt: 1.5 }}
                    style={{ padding: "20px" }}
                  >
                    <div style={{ fontSize: "20px" }}>
                      {obj?.visualization?.title}
                    </div>
                    <Box
                      sx={{ pt: 1, pr: 2 }}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {obj?.visualization?.chart_type === "line" && (
                        <LineChart
                          dataset={obj?.visualization?.data}
                          xAxis={[
                            {
                              dataKey: "x",
                              scaleType: "band",
                              label: obj?.visualization?.x_label || "X-Axis",
                              stroke: "#1F2937", // Dark gray stroke
                              labelStyle: {
                                fill: "#1F2937", // Text color
                                fontSize: "16px",
                                fontWeight: "600",
                                fontStyle: "italic",
                                paddingTop: "10px",
                              },
                              tickLabelStyle: {
                                fill: "#374151",
                                fontSize: "14px",
                              },
                            },
                          ]}
                          series={[
                            {
                              dataKey: "y",
                              label: obj?.visualization?.y_label || "Y-Axis",
                              color: "#10B981", // Green line
                              curveType: "monotone", // Smooth curved line
                              strokeWidth: 3, // Thicker line
                              markerShape: "circle", // Circle markers on data points
                              markerSize: 6, // Bigger markers
                              showMark: true, // Ensures markers appear
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              }, // Highlighting effect on hover
                            },
                          ]}
                          height={350}
                          margin={{ left: 40, right: 40, top: 60, bottom: 60 }}
                          grid={{
                            vertical: true,
                            horizontal: true,
                            strokeDasharray: "4 4",
                            stroke: "#E5E7EB",
                          }}
                          tooltip={{
                            enabled: true,
                            trigger: "axis",
                            background: "#fff",
                            borderColor: "#E5E7EB",
                            borderWidth: 1,
                            borderRadius: 6,
                            textStyle: { color: "#1F2937", fontSize: "14px" },
                          }}
                          legend={{
                            position: { vertical: "top", horizontal: "center" },
                            itemStyle: {
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#374151",
                            },
                          }}
                        />
                      )}
                      {obj?.visualization?.chart_type === "bar" && (
                        <BarChart
                          dataset={obj?.visualization?.data}
                          xAxis={[
                            {
                              dataKey: "x",
                              scaleType: "band",
                              label: obj?.visualization?.x_label,
                              stroke: "#374151", // Dark gray
                              labelStyle: {
                                fill: "#1F2937",
                                fontSize: "16px",
                                fontWeight: "600",
                                paddingTop: "10px",
                                fontStyle: "italic",
                              },
                              tickLabelStyle: {
                                fill: "#4B5563",
                                fontSize: "14px",
                                fontWeight: "500",
                              },
                            },
                          ]}
                          series={[
                            {
                              dataKey: "y",
                              label: obj?.visualization?.y_label,
                              color: "#6366F1", // Soft blue
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                              barWidth: 30, // Custom bar width
                              showMark: true, // Show markers at data points
                              gradient: true, // Adds gradient effect
                              opacity: 0.9, // Slight transparency
                            },
                          ]}
                          height={350}
                          margin={{ left: 100, right: 50, top: 50, bottom: 60 }}
                          grid={{
                            vertical: true,
                            horizontal: true,
                            strokeDasharray: "4 4",
                            stroke: "#E5E7EB",
                          }}
                          tooltip={{
                            enabled: true,
                            trigger: "axis",
                            background: "#fff",
                            borderColor: "#E5E7EB",
                            borderWidth: 1,
                            borderRadius: 6,
                            textStyle: { color: "#1F2937", fontSize: "14px" },
                          }}
                          legend={{
                            position: { vertical: "top", horizontal: "center" },
                            itemStyle: {
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#374151",
                            },
                          }}
                        />
                      )}

                      {obj?.visualization?.chart_type === "pie" && (
                        <PieChart
                          series={[
                            {
                              data: obj?.visualization?.data?.map((item) => ({
                                id: item.x, // Using `x` as unique identifier
                                value: item.y, // `y` is the numeric value
                                label: item.x, // Display `x` as label
                              })),
                              innerRadius: 30, // Creates a donut-style effect
                              outerRadius: 100,
                              paddingAngle: 3, // Adds spacing between slices
                              cornerRadius: 6, // Smooth corners
                              cx: "50%", // Centers the chart
                              cy: "50%",
                              highlightScope: {
                                faded: "global",
                                highlighted: "item",
                              },
                            },
                          ]}
                          width={400}
                          height={350}
                          margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
                          legend={{
                            position: {
                              vertical: "bottom",
                              horizontal: "center",
                            },
                            itemStyle: {
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#374151",
                            },
                          }}
                          tooltip={{
                            enabled: true,
                            background: "#fff",
                            borderColor: "#E5E7EB",
                            borderWidth: 1,
                            borderRadius: 6,
                            textStyle: { color: "#1F2937", fontSize: "14px" },
                          }}
                        />
                      )}
                    </Box>
                    <div className="mt-2">
                      Details<div className="mt-2">{obj.summary}</div>
                    </div>
                  </MainCard>
                </Grid>
              )}
            </Fragment>
          );
        })}
      </Grid>
      <UploadCsvModal
        open={openUploadModal}
        handleClose={handleCloseModal}
        setData={setData}
      />
    </>
  );
};
export default withLayout(Dashboard);

{
  /* <Grid item xs={12} md={12} lg={6}>
          <MainCard
            content={false}
            sx={{ mt: 1.5 }}
            style={{ padding: "20px" }}
          >
            text
            <Box sx={{ pt: 1, pr: 2 }}>
              <LineChart
                dataset={data?.insights?.[0]?.visualization?.data}
                xAxis={[{ dataKey: "x", scaleType: "band" }]}
                series={[{ dataKey: "y" }]}
                height={300}
                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </Box>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <MainCard
            content={false}
            sx={{ mt: 1.5 }}
            style={{ padding: "20px" }}
          >
            text
            <Box sx={{ pt: 1, pr: 2 }}>
              <LineChart
                dataset={data?.insights?.[0]?.visualization?.data}
                xAxis={[{ dataKey: "x", scaleType: "band" }]}
                series={[{ dataKey: "y" }]}
                height={300}
                margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
                grid={{ vertical: true, horizontal: true }}
              />
            </Box>
          </MainCard>
        </Grid> */
}

{
  /* <UniqueVisitorCard /> */
}

{
  /* <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Income Overview</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <Box sx={{ p: 3, pb: 0 }}>
              <Stack spacing={2}>
                <Typography variant="h6" color="text.secondary">
                  This Week Statistics
                </Typography>
                <Typography variant="h3">$7,650</Typography>
              </Stack>
            </Box>
            <MonthlyBarChart />
          </MainCard>
        </Grid> */
}

{
  /* <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recent Orders</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid> */
}
{
  /* <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Analytics Report</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List sx={{ p: 0, "& .MuiListItemButton-root": { py: 2 } }}>
              <ListItemButton divider>
                <ListItemText primary="Company Finance Growth" />
                <Typography variant="h5">+45.14%</Typography>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemText primary="Company Expenses Ratio" />
                <Typography variant="h5">0.58%</Typography>
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Business Risk Cases" />
                <Typography variant="h5">Low</Typography>
              </ListItemButton>
            </List>
            <ReportAreaChart />
          </MainCard>
        </Grid> */
}

{
  /* <Grid item xs={12} md={7} lg={8}>
          <SaleReportCard />
        </Grid> */
}
{
  /* <Grid item xs={12} md={5} lg={4}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Transaction History</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <List
              component="nav"
              sx={{
                px: 0,
                py: 0,
                "& .MuiListItemButton-root": {
                  py: 1.5,
                  "& .MuiAvatar-root": avatarSX,
                  "& .MuiListItemSecondaryAction-root": {
                    ...actionSX,
                    position: "relative",
                  },
                },
              }}
            >
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{ color: "success.main", bgcolor: "success.lighter" }}
                  >
                    <GiftOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">Order #002434</Typography>
                  }
                  secondary="Today, 2:00 AM"
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $1,430
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      78%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton divider>
                <ListItemAvatar>
                  <Avatar
                    sx={{ color: "primary.main", bgcolor: "primary.lighter" }}
                  >
                    <MessageOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">Order #984947</Typography>
                  }
                  secondary="5 August, 1:45 PM"
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $302
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      8%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{ color: "error.main", bgcolor: "error.lighter" }}
                  >
                    <SettingOutlined />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1">Order #988784</Typography>
                  }
                  secondary="7 hours ago"
                />
                <ListItemSecondaryAction>
                  <Stack alignItems="flex-end">
                    <Typography variant="subtitle1" noWrap>
                      + $682
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap>
                      16%
                    </Typography>
                  </Stack>
                </ListItemSecondaryAction>
              </ListItemButton>
            </List>
          </MainCard>
          <MainCard sx={{ mt: 2 }}>
            <Stack spacing={3}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Stack>
                    <Typography variant="h5" noWrap>
                      Help & Support Chat
                    </Typography>
                    <Typography variant="caption" color="secondary" noWrap>
                      Typical replay within 5 min
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <AvatarGroup
                    sx={{ "& .MuiAvatar-root": { width: 32, height: 32 } }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={"https://picsum.photos/200"}
                    />
                    <Avatar
                      alt="Travis Howard"
                      src={"https://picsum.photos/200"}
                    />
                    <Avatar
                      alt="Cindy Baker"
                      src={"https://picsum.photos/200"}
                    />
                    <Avatar
                      alt="Agnes Walker"
                      src={"https://picsum.photos/200"}
                    />
                  </AvatarGroup>
                </Grid>
              </Grid>
              <Button
                size="small"
                variant="contained"
                sx={{ textTransform: "capitalize" }}
              >
                Need Help?
              </Button>
            </Stack>
          </MainCard>
        </Grid> */
}

// {obj?.visualization?.chart_type === "scatter" && (
//   <ScatterChart
//     width={500}
//     height={300}
//     xAxis={[{ dataKey: "x", scaleType: "band" }]}
//     series={[{ dataKey: "y" }]}
//     series={[
//       ...obj?.visualization?.data?.map((minObj, i, arr) => {
//         return {
//           data: [minObj],
//           label: minObj.label,
//           id: `${i}-${minObj.label}`,
//         };
//       }),
//     ]}
//     xAxis={[{ min: 0 }]}
//     margin={{ left: 50, right: 30, top: 100, bottom: 30 }}
//   />
// )}
