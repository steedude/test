import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todo";
import counterReducer from "./slice/counterSlice";
import usersReducer from "./slice/apiTest";

export default configureStore({
  reducer: {
    todo: todoReducer,
    counter: counterReducer,
    users: usersReducer,
  },
});
