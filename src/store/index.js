import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todo";
import counterReducer from "./slice/counterSlice";

export default configureStore({
  reducer: {
    todo: todoReducer,
    counter: counterReducer,
  },
});
