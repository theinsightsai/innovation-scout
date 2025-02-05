"use client";

import withLayout from "@/components/hoc/withLayout";
import { useState } from "react";
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

// assets
import GiftOutlined from "@ant-design/icons/GiftOutlined";
import MessageOutlined from "@ant-design/icons/MessageOutlined";
import SettingOutlined from "@ant-design/icons/SettingOutlined";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};

const Dashboard = () => {
  const role_id = useSelector((state) => state?.auth?.role_id);
  const [openUploadModal, setOpenUploadModal] = useState(false);

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

        <Grid item xs={12} md={7} lg={8}>
          <UniqueVisitorCard />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
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
        </Grid>

        <Grid item xs={12} md={7} lg={8}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h5">Recent Orders</Typography>
            </Grid>
            <Grid item />
          </Grid>
          <MainCard sx={{ mt: 2 }} content={false}>
            <OrdersTable />
          </MainCard>
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
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
        </Grid>

        <Grid item xs={12} md={7} lg={8}>
          <SaleReportCard />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
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
        </Grid>
      </Grid>
      <UploadCsvModal open={openUploadModal} handleClose={handleCloseModal} />
    </>
  );
};
export default withLayout(Dashboard);

// <>
//   <PageHeader
//     text="Home"
//     buttonText="Upload CSV"
//     onButtonClick={handleOpenModal}
//     icon={<ExcelIcon height={30} width={30} />}
//   />
//   <Paper elevation={3} className="mt-5 p-10">
//     <div className="flex flex-wrap gap-5 flex-col md:flex-row">
//       {/* Left Column */}
//       <div className="flex-1 min-w-[250px]  ">
//         <Paper className="p-4">
//           <h2 className="text-xl mb-3">Sales Trend Analysis</h2>
//           <LineChart
//             width={500}
//             height={300}
//             series={[
//               { data: pData, label: "Online", id: "pvId" },
//               { data: uData, label: "In-Store", id: "uvId" },
//             ]}
//             xAxis={[{ scaleType: "point", data: xLabels }]}
//             sx={{
//               [`.${lineElementClasses.root}, .${markElementClasses.root}`]:
//                 {
//                   strokeWidth: 1,
//                 },
//               ".MuiLineElement-series-pvId": {
//                 strokeDasharray: "5 5",
//               },
//               ".MuiLineElement-series-uvId": {
//                 strokeDasharray: "3 4 5 2",
//               },
//               [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]:
//                 {
//                   fill: "#fff",
//                 },
//               [`& .${markElementClasses.highlighted}`]: {
//                 stroke: "none",
//               },
//             }}
//           />
//           <h3 className="text-base mb-3">
//             <span style={{ color: "#005B96" }}>Market Trend Analysis:</span>{" "}
//             A Step-by-Step Process Success
//           </h3>
//         </Paper>
//       </div>

//       {/* Right Column */}
//       <div className="flex-1 min-w-[250px] flex-col ">
//         <Paper className="p-4">
//           <h2 className="text-xl mb-3">
//             Total Purchasing in San Francisco, CA
//           </h2>
//           <LineChart
//             xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
//             series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
//             width={500}
//             height={300}
//           />
//           <h3 className="text-base mb-3">
//             <span style={{ color: "#005B96" }}>Insights:</span> Unlocking
//             Market Potential and Growth
//           </h3>
//         </Paper>
//       </div>
//     </div>

//     <div className="flex flex-wrap gap-5 mt-12 flex-col  md:flex-row">
//       {/* Left Column */}
//       <div className="flex-1 min-w-[250px] sm:w-full md:w-1/2">
//         <Paper className="p-4">
//           <h2 className="text-xl mb-3">Purchases Analytics</h2>
//           <LineChart
//             xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
//             series={[
//               {
//                 data: [2, 5.5, 2, 8.5, 1.5, 5],
//                 valueFormatter: (value) =>
//                   value == null ? "NaN" : value.toString(),
//               },
//               {
//                 data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
//               },
//               {
//                 data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
//                 valueFormatter: (value) =>
//                   value == null ? "?" : value.toString(),
//               },
//             ]}
//             height={200}
//             margin={{ top: 10, bottom: 20 }}
//           />
//           <h3 className="text-base mt-5">
//             <span style={{ color: "#005B96" }}>Analytics:</span> A Deep Dive
//             into Consumer Behavior
//           </h3>
//         </Paper>
//       </div>

//       {/* Right Column */}
//       <div className="flex-1 min-w-[250px] sm:w-full md:w-1/2">
//         <Paper className="p-4">
//           <h2 className="text-xl mb-3">Purchased By City</h2>
//           <PieChart
//             series={[
//               {
//                 data: [
//                   { id: 0, value: 10, label: "Los Angeles" },
//                   { id: 1, value: 15, label: "New York City" },
//                   { id: 2, value: 15, label: "Chicago" },
//                   { id: 3, value: 20, label: "San Diego" },
//                   { id: 4, value: 5, label: "Other" },
//                 ],
//               },
//             ]}
//             width={400}
//             height={200}
//           />
//           <h3 className="text-base mt-5">
//             <span style={{ color: "#005B96" }}>Insights:</span> Overview of
//             Purchases Across Different Locations
//           </h3>
//         </Paper>
//       </div>
//     </div>
//   </Paper>
//   <UploadCsvModal open={openUploadModal} handleClose={handleCloseModal} />
// </>
