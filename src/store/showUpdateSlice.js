import { createSlice } from "@reduxjs/toolkit";

const initialShowState = { isShow: false, taskId: "" };

const showUpdateSlice = createSlice({
  name: "show",
  initialState: initialShowState,
  reducers: {
    show(state, action) {
      state.isShow = true;
      state.taskId = action.payload;
    },
    remove(state) {
      state.isShow = false;
      state.taskId = "";
    },
  },
});

export const showUpdateActions = showUpdateSlice.actions;

export default showUpdateSlice.reducer;
