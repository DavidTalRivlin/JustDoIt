const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

const initialState = {
    todos: [],
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
            console.log('in switch update')
            return { ...state, todos }


        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store