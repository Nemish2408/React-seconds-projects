import { createSlice } from '@reduxjs/toolkit';

let nextTodoId = 0;

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (text) => ({
                payload: {
                    id: nextTodoId++,
                    text,
                    completed: false,
                    createdAt: new Date().toISOString()
                }
            })
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        },
        clearCompleted: (state) => {
            return state.filter(todo => !todo.completed);
        }
    }
});

export const { addTodo, toggleTodo, deleteTodo, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;