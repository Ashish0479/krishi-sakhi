import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./slices/authSlice";
import WeatherSliceReducer from "./slices/weatherSlice";

const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    weather: WeatherSliceReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;