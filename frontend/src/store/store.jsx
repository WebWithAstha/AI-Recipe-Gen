import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice.jsx";
import RecipeSlice from "./slices/RecipeSlice.jsx";

export const store = configureStore({
  reducer: { UserSlice, RecipeSlice },
});
