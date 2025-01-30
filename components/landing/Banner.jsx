"use client";
import { Box, Grid } from "@mui/material";
import { IMAGES } from "@/constants";
import { FilledButton } from "..";

const Banner = () => {
  const onGerstartedButtonClick = () => { };

  return (
    <Box
      className="flex-grow h-screen bg-cover bg-center p-[60px_0]"
      style={{ backgroundImage: `url(${IMAGES.BANNER})` }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} className="hidden lg:flex"></Grid>
        <Grid
          item
          xs={12}
          lg={6}
          className="h-[95vh] flex justify-center flex-col items-center text-center lg:items-start lg:text-start"
          style={{ flexDirection: "column" }}
        >
          <div className="text-white uppercase font-black text-5xl">
            SAMI AI <br />
            <span className="text-3xl">Empowering Future Trends</span>
          </div>
          <div className="w-3/4 mt-10 text-white text-xl">
            Get AI-driven insights on emerging trends in markets, technology,
            and consumer behavior. Ask questions, explore categorized responses,
            and easily save or export your findings.
          </div>
          <FilledButton label="Get Started" onClick={onGerstartedButtonClick} />
        </Grid>
      </Grid>
    </Box>
  );
};
export default Banner;
