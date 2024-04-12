import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
  name: "news",
  initialState: {
    data: [],
  },
  reducers: {
    setNewsData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setNewsData } = newsSlice.actions;

export default newsSlice;
