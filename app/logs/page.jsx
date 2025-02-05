"use client";
import { Fragment } from "react";
import withLayout from "@/components/hoc/withLayout";
import { PageHeader } from "@/components";

const Logs = () => {
  return (
    <Fragment>
      <PageHeader text="Logs" buttonText={""} onButtonClick={""} icon={""} />
    </Fragment>
  );
};
export default withLayout(Logs);
