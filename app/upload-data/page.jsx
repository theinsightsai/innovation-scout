"use client";
import { withLayout } from "@/components/hoc";
import { PageHeader } from "@/components";
import Paper from "@mui/material/Paper";

const UploadData = () => {
  return (
    <>
      <PageHeader text="Upload Data" />
      <Paper elevation={3} className="mt-5 p-10">
        test
      </Paper>
    </>
  );
};
export default withLayout(UploadData);
