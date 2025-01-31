"use client";
import { PageHeader, withLayout } from "@/components";
import Paper from "@mui/material/Paper";

const Analysis = () => {
  return (
    <>
      <PageHeader text="Analysis" />
      <Paper elevation={3} className="mt-5 p-10">
        test
      </Paper>
    </>
  );
};
export default withLayout(Analysis);
