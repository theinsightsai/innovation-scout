"use client";
import React from "react";
import { CssBaseline, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";
import { IMAGES } from "@/constants";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const StyledImage = styled(Box)(({ theme }) => ({
  flex: 7,
  backgroundImage: `url(${IMAGES.LOGIN_BANNER})`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "lightgray",
  backgroundSize: "cover",
  backgroundPosition: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const StyledContent = styled(Box)(({ theme }) => ({
  flex: 3,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(8, 4),
  width: "100%",
}));

const withAuthLayout = (Component) => {
  return function AuthLayoutWrapper(props) {
    return (
      <StyledBox>
        <CssBaseline />
        <StyledImage />
        <StyledContent component={Paper} elevation={4}>
          <img src={IMAGES.LOGO} alt="Logo" />
          <Component {...props} />
        </StyledContent>
      </StyledBox>
    );
  };
};

export default withAuthLayout;
