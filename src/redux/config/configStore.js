import todos from "../modules/todos";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    todos,
  },
});

// 3. export
export default store;
