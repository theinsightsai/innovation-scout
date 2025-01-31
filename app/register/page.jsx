"use client"
import { Fragment } from "react";
import WithAuthLayout from "@/components/hoc/WithAuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <Fragment>
      <RegisterForm />
    </Fragment>
  )

};
export default WithAuthLayout(Register);
