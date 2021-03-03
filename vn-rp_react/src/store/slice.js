import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "rp-vn",
  initialState: {
    production: false,
    customizeSlot: -1
  },
  reducers: {
    setProduction(state, action) {
      state.production = action.payload.set;
    },
    setCustomizeSlot(state, action) {
      state.customizeSlot = action.payload.slot;
    },
  }
});

const { actions, reducer } = slice;
export const { setProduction, setCustomizeSlot } = actions;
export default reducer;