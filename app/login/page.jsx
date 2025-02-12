"use client";
import { Fragment } from "react";
import WithAuthLayout from "@/components/hoc/WithAuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Fragment>
      <LoginForm />
    </Fragment>
  );
};
export default WithAuthLayout(LoginPage);
