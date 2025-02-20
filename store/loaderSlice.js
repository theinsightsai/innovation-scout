import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      console.log("state==>", state);
      state.loading = true;
    },
    hideLoader: (state) => {
        console.log("state==>", state);

      state.loading = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export default loaderSlice.reducer;
