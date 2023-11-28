import { configureStore } from "@reduxjs/toolkit";
import citiesSlice from "../features/cities/citiesSlice";
import authSlice from "../features/authentication/authSlice";

const store = configureStore({
  reducer: {
    cities: citiesSlice,
    auth: authSlice,
  },
});

export default store;
