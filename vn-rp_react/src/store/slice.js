import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "rp-vn",
  initialState: {
    production: false
  },
  reducers: {
    setProduction(state, action) {
      console.log(action.payload);
      state.production = action.payload.set;
    }
  }
});

const { actions, reducer } = slice;
export const { setProduction } = actions;
export default reducer;