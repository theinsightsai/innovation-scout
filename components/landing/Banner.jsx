"use client";
import { Box, Grid, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { LANDING_PAGE_BG, ROUTE, IMAGES } from "@/constants";

const LandingPage = () => {
  const router = useRouter();

  return (
    <Box
      className="flex-grow bg-cover bg-center"
      sx={{
        backgroundColor: LANDING_PAGE_BG,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        overflowX: "hidden",
        padding: { xs: "40px 0", md: "10px 0" },
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{ width: { xs: "90%", sm: "80%" }, paddingTop: "10px" }}
      >
        <Grid
          item
          xs={12}
          lg={6}
          className="flex flex-col items-center text-center lg:items-start lg:text-start"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: { xs: "auto", md: "95vh" },
          }}
        >
          <div
            style={{
              fontWeight: 500,
              fontSize: "52px",
              lineHeight: "61.67px",
            }}
          >
            Best AI tool
            <br />
            to <span className="text-primary_color">forecast</span> your data
          </div>

          <Typography
            variant="body1"
            color="white"
            sx={{
              width: { xs: "90%", md: "75%" },
            }}
            style={{
              marginTop: "20px",
              fontFamily: "Outfit, sans-serif",
              color: "#787878",
              fontWeight: 500,
              lineHeight: "18.98px",
            }}
          >
            Leave traditional method to analyze your data. upload your excel
            sheet let our tool forecast your data.
          </Typography>

          <Button
            onClick={() => router.push(ROUTE.AUTH)}
            sx={{
              backgroundColor: "#8635FD",
              fontSize: "18px",
              lineHeight: "23.72px",
              fontWeight: 500,
              color: "white",
              borderRadius: "30px",
              padding: "17px 20px",
              marginTop: "30px",
              fontFamily: "Outfit, sans-serif",
              border: "2px solid transparent",
              "&:hover": {
                backgroundColor: "white",
                color: "#8635FD",
                border: "2px solid ",
              },
              transition: "all 0.3s ease-in-out",
              textTransform: "capitalize",
            }}
          >
            Start your 7 days free trial
          </Button>
          <div
            style={{
              fontWeight: 500,
              fontSize: "14px",
              lineHeight: "14.23px",
              color: "#787878",
              marginTop: "20px",
              marginLeft: "20px",
            }}
          >
            * No credit card is required
          </div>
        </Grid>

        {/* RIGHT SIDE IMAGE SECTION */}
        <Grid item xs={12} lg={6} className="hidden lg:flex">
          <img
            src={IMAGES.BANNER}
            alt="AI Banner"
            style={{
              maxWidth: "100%",
              height: "auto", // Prevents stretching
              objectFit: "contain", // Keeps aspect ratio
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;
