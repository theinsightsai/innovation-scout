"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

// Project import
import { IMAGES, ROUTE } from "@/constants";
import {
  EmailIconSvg,
  FaceBookSvg,
  AppleSvgIcon,
  GoogleSvgIcon,
  UserIconSvg,
  PasswordSvg,
} from "@/constants/assets";

// Material UI Import
import { CssBaseline, Paper, Box, FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

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
  backgroundImage: `url(${IMAGES.AI_ICON})`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "black",
  backgroundSize: "contain",
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

const TAB_MENU = [
  { label: "Login", identifier: "LOGIN" },
  { label: "Register", identifier: "REGISTER" },
];

const FIELDS = [
  { label: "Email Address", icon: <EmailIconSvg /> },
  { label: "Full name", icon: <UserIconSvg /> },
  { label: "Password", icon: <PasswordSvg /> },
];

const withAuthLayout = (Component) => {
  return function AuthLayoutWrapper(props) {
    const router = useRouter();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const [activeTab, setActiveTab] = useState(TAB_MENU?.[0]?.identifier);

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

        {/* <StyledImage /> */}
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

          {FIELDS.map((fieldObj, i, arr) => {
            return (
              <FormControl
                sx={{ mt: 5, width: "70%" }}
                key={`${fieldObj.label}-${i}`}
              >
                <InputLabel htmlFor="outlined-adornment-amount">
                  {fieldObj.label} <span style={{ color: "red" }}>*</span>
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">
                      {fieldObj.icon}
                    </InputAdornment>
                  }
                  label={`${fieldObj.label} *`}
                  sx={{
                    borderRadius: "7px",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1A22B5",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1A22B5",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1A22B5",
                    },
                  }}
                />
              </FormControl>
            );
          })}

          <button
            className={`w-[180px] py-4 px-10 rounded-full text-white transition-colors duration-500 bg-[#1A22B5] mt-10`}
          >
            {activeTab === "LOGIN" ? "Login" : "Register"}
          </button>
          <div style={{ color: "#B5B5B5", marginTop: "15px" }}>
            or continue with
          </div>
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <FaceBookSvg />
            <AppleSvgIcon />
            <GoogleSvgIcon />
          </div>

          {/* <Component {...props} /> */}
        </StyledContent>
      </StyledBox>
    );
  };
};

export default withAuthLayout;

{
  /* <img src={IMAGES.LOGO} alt="Logo" /> */
}
