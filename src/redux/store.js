import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./slices/authSlice";
import WeatherSliceReducer from "./slices/weatherSlice";
 import chatbotSliceReducer from "./slices/chatbotSlice";
import cropHealthSliceReducer from "./slices/cropHealthSlice";
import profileSliceReducer from "./slices/profileSlice";

const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    weather: WeatherSliceReducer,
    chatbot: chatbotSliceReducer,
    cropHealth:cropHealthSliceReducer,
    profile:profileSliceReducer
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;