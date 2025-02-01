import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.count += action.payload.value;
    },
  },
});

export const { increment } = counterSlice.actions;
const counterReducer = counterSlice.reducer;
export default counterReducer;
