import { createSlice } from "@reduxjs/toolkit";

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    data: [],
  },
  reducers: {
    setVideoData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setVideocData } = videoSlice.actions;

export default videoSlice;
