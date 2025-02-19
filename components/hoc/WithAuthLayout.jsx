"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";

// Project import
import { IMAGES, ROUTE } from "@/constants";
import { FaceBookSvg, AppleSvgIcon, GoogleSvgIcon } from "@/constants/assets";

// Material UI Import
import { CssBaseline, Paper, Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  minHeight: "100vh",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
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

const TAB_MENU = [
  { label: "Login", identifier: "LOGIN" },
  { label: "Register", identifier: "REGISTER" },
];

const withAuthLayout = (Component) => {
  return function AuthLayoutWrapper(props) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const auth = searchParams.get("auth");
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [activeTab, setActiveTab] = useState(
      auth === "register"
        ? TAB_MENU?.[1]?.identifier
        : TAB_MENU?.[0]?.identifier
    );

    useEffect(() => {
      if (isAuthenticated) {
        router.push(ROUTE.DASHBOARD);
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
      return null;
    }

    const handleTabChange = (event, tabValue) => {
      setActiveTab(tabValue);
    };

    return (
      <StyledBox>
        <CssBaseline />

        <div
          className="flex-7 bg-black flex justify-center items-center"
          style={{ flex: 7 }}
        >
          <video
            src={IMAGES.AI_ICON}
            className="h-[60%]"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        </div>

        <StyledContent component={Paper} elevation={4}>
          <h1 className="text-xl mt-5 mb-2 font-outfit flex justify-center">
            Welcome to Innovation Scout
          </h1>

          <div className="flex mt-5 p-2 bg-[#6368D2] rounded-full">
            {TAB_MENU.map((tab, i, arr) => {
              return (
                <button
                  className={`w-[125px] py-2 px-4 rounded-full text-white transition-colors duration-500 ${
                    activeTab === tab.identifier
                      ? "bg-[#1A22B5]"
                      : "bg-transparent"
                  }`}
                  onClick={(event) => handleTabChange(event, tab.identifier)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div style={{ width: "100%" }}>
            <Component {...props} activeTab={activeTab} />
          </div>

          <div style={{ color: "#B5B5B5", marginTop: "15px" }}>
            or continue with
          </div>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <FaceBookSvg />
            <AppleSvgIcon />
            <GoogleSvgIcon />
          </div>
        </StyledContent>
      </StyledBox>
    );
  };
};

export default withAuthLayout;

{
  /* <img src={IMAGES.LOGO} alt="Logo" /> */
}
