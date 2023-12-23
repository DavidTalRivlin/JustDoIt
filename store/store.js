import { todoService } from "../services/todo.service.js"

const { createStore } = Redux

// todos
export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

// filter
export const SET_FILTER = 'SET_FILTER'


// loader
export const IS_LOADING = 'IS_LOADING'

const initialState = {
    todos: [],
    filterBy: todoService.getDefaultFilter(),
    isLoading: true
}

function appReducer(state = initialState, action = {}) {
    let todos
    

    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }

        case REMOVE_TODO:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }

        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }

        case SET_FILTER:
            return { ...state, filterBy: action.filterBy }

        case IS_LOADING:
            return { ...state, isLoading: action.isLoading }




        default:
            return state
    }
}


export const store = createStore(appReducer)
window.gStore = store