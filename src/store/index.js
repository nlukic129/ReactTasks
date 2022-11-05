import { configureStore } from "@reduxjs/toolkit";

import showUpdateReducer from "./showUpdateSlice";

const store = configureStore({
  reducer: { show: showUpdateReducer },
});

export default store;
