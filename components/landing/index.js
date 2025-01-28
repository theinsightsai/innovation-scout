"use client";
import Navbar from "../navbar";
import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IMAGES } from "@/constants";
import { Typography, Button } from "@mui/material";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          flexGrow: 1,
          backgroundImage: `url(${IMAGES.BANNER})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "95vh",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}></Grid>
          <Grid
            item
            xs={6}
            style={{
              height: "95vh",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              style={{
                color: "white",
                textTransform: "uppercase",
                fontWeight: 900,
                fontSize: "40px",
              }}
            >
              Innovation Scout
            </Typography>
            <Typography
              style={{ width: "70%", marginTop: "40px", color: "white" }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
            </Typography>
            <Button
              style={{
                backgroundColor: "#005B96",
                borderColor: "#FFFFFF",
                borderRadius: "30px",
                fontFamily: `"Oswald", Sans-serif`,
                fontSize: "16px",
                fontWeight: 500,
                width: "20%",
                textDecoration: "none",
                padding: "10px",
                color: "#FFFFFF",
                marginTop: "50px",
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default LandingPage;
