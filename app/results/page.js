"use client";
import { withAuth } from "@/components/hoc";
import { PageHeader } from "@/components";
import Paper from "@mui/material/Paper";

const Results = () => {
  return (
    <>
      <PageHeader text="Results" />
      <Paper elevation={3} className="mt-5 p-10">
        test
      </Paper>
    </>
  );
};
export default withAuth(Results);
