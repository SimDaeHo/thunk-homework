import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 0.값 조회
export const __getTodos = createAsyncThunk("GET_TODOS", async (arg, thunkAPI) => {
  try {
    const todos = await axios.get("http://localhost:4000/todos");

    return thunkAPI.fulfillWithValue(todos.data);
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

// 1.추가
export const __addTodoThunk = createAsyncThunk("ADD_TODO", async (arg, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:4000/todos", arg);

    return thunkAPI.fulfillWithValue(response.data);
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

// 2.삭제
export const __deleteTodoThunk = createAsyncThunk("DELETE_TODO", async (arg, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:4000/todos/${arg}`, arg);
    return thunkAPI.fulfillWithValue(arg);
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

// 3.스위치
export const __switchTodoThunk = createAsyncThunk("SWITCH_TODO", async (arg, thunkAPI) => {
  try {
    await axios.patch(`http://localhost:4000/todos/${arg}`, arg);
    return thunkAPI.fulfillWithValue(arg);
  } catch (err) {
    console.log(err);
    return thunkAPI.rejectWithValue(err);
  }
});

// initial states
const initialState = {
  todos: [],
  isSuccess: false,
  isLoading: false,
  error: null,
};

// createSlice의 결과물 -> action creators와 reducers
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // addTodo: (state, action) => {
    //   return [...state, action.payload];
    // }, // action creator의 이름
    // removeTodo: (state, action) => {
    //   return state.filter((item) => item.id !== action.payload);
    // }, // action creator의 이름
    switchTodo: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload) {
          return { ...item, isDone: !item.isDone };
        } else {
          return item;
        }
      });
    }, // action creator의 이름
  },
  extraReducers: {
    [__getTodos.fulfilled]: (state, action) => {
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      //
    },
    [__addTodoThunk.fulfilled]: (state, action) => {
      state.todos.push(action.payload);
    },
    [__addTodoThunk.rejected]: (state, action) => {
      //
    },

    [__deleteTodoThunk.fulfilled]: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
    [__deleteTodoThunk.rejected]: (state, action) => {
      //
    },
    [__switchTodoThunk.fulfilled]: (state, action) => {
      state.todos = state.todos.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });
    },
    [__switchTodoThunk.rejected]: (state, action) => {
      //
    },
  },
});

export const { removeTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
