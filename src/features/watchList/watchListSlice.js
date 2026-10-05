import { createSlice } from "@reduxjs/toolkit";

const savedWatchList = JSON.parse(localStorage.getItem("watchList")) || [];

const initialState = {
  watchList: savedWatchList,
};

const watchListSlice = createSlice({
  name: "watchList",
  initialState,

  reducers: {
    addItem(state, action) {
      // Prevent duplicates
      const exists = state.watchList.some(
        (item) => String(item.id) === String(action.payload.id),
      );
      if (exists) return;

      state.watchList.push(action.payload);
      localStorage.setItem("watchList", JSON.stringify(state.watchList));
    },

    clearWatchList(state) {
      state.watchList = [];
      localStorage.setItem("watchList", JSON.stringify([]));
    },

    removeItem(state, action) {
      state.watchList = state.watchList.filter(
        (item) => String(item.id) !== String(action.payload),
      );
      localStorage.setItem("watchList", JSON.stringify(state.watchList));
    },
  },
});

export const { addItem, clearWatchList, removeItem } = watchListSlice.actions;

export default watchListSlice.reducer;
