import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import filtersReducer from '../features/filters/filtersSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    visibilityFilter: filtersReducer
  }
});

export default store;