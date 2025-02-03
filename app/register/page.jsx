"use client";
import { Fragment } from "react";
import RegisterForm from "@/components/auth/RegisterForm";
import WithAuthLayout from "@/components/hoc/WithAuthLayout";

const Register = () => {
  return (
    <Fragment>
      <RegisterForm />
    </Fragment>
  );
};

export default WithAuthLayout(Register);
