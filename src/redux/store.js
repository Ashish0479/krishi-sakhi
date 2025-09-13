import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./slices/authSlice";
import WeatherSliceReducer from "./slices/weatherSlice";
 import chatbotSliceReducer from "./slices/chatbotSlice";

const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    weather: WeatherSliceReducer,
    chatbot: chatbotSliceReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default store;