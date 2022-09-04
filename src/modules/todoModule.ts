import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo } from '../Types'

type State = {
    todos: Todo[]
    filter: string
}

const initialState: State = {
    todos: [
        {
            key: 'test1',
            text: 'test1',
            done: false,
        },
    ],
    filter: 'TODO',
}

const todoModule = createSlice({
    name: 'todos',
    initialState,
    // reducers
    reducers: {
        // action creator
        handleAdd(state: State, action: PayloadAction<string>) {
            const getKey = Math.random().toString(32).substring(2)
            const newTodo: Todo = {
                key: getKey,
                text: action.payload,
                done: false,
            }
            state.todos = [newTodo, ...state.todos]
        },
        handleFilterChange(state: State, action: PayloadAction<string>) {
            state.filter = action.payload
        },
        handleCheck(state: State, action: PayloadAction<Todo>) {
            const todo = state.todos.find(
                (todo) => todo.key === action.payload.key
            )
            if (todo) {
                todo.done = !todo.done
            }
        },
        handleDelete(state: State, action: PayloadAction<Todo>) {
            state.todos.filter((todo) => todo.key !== action.payload.key)
        },
    },
})

export const { handleAdd, handleFilterChange, handleCheck, handleDelete } =
    todoModule.actions

export default todoModule
