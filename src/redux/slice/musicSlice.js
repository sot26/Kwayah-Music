import { createSlice } from "@reduxjs/toolkit";

export const musicSlice = createSlice({
  name: "music",
  initialState: {
    data: [],
  },
  reducers: {
    setMusicData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setMusicData } = musicSlice.actions;

export default musicSlice;
