import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./slice/musicSlice";
import newsSlice from "./slice/newsSlice";
import videoSlice from "./slice/videoSlice";

export const store = configureStore({
  reducer: {
    music: musicSlice.reducer,
    news: newsSlice.reducer,
    video: videoSlice.reducer,
  },
});
