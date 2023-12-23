const { useState, useEffect, useRef } = React
const { useSelector, useDispatch } = ReactRedux

import { todoService } from "../services/todo.service.js";
import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { SET_TODOS, REMOVE_TODO, ADD_TODO, UPDATE_TODO, SET_FILTER,IS_LOADING } from "../store/store.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service.js";

export function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)
    const filterBy = useSelector(storeState => storeState.filterBy)
    const isLoading = useSelector(storeState => storeState.isLoading)

    // const [filterBy, setFilterBy] = useState(todoService.getDefaultFilter())
    const debounceOnSetFilter = useRef(utilService.debounce(UpdateFilter, 500))

    function UpdateFilter(newFilter) {
        dispatch({ type: SET_FILTER, filterBy: newFilter })
    }


    useEffect(() => {
        loadTodos()
    }, [filterBy])


    function loadTodos() {
        todoService.query(filterBy)
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
                dispatch({ type: IS_LOADING, isLoading:false })


            })
            .catch(err => console.log('err:', err))
    }

    function onDoneToggle(todo) {
        const updatedIsDone = todo.isDone = !todo.isDone
        const todoToSave = { ...todo, isDone: updatedIsDone }
        console.log('todoToSave', todoToSave)

        todoService.save(todoToSave)
            .then((savedTodo) => {
                dispatch({ type: UPDATE_TODO, todo: savedTodo })
                showSuccessMsg(`todo update`)
            })
            .catch(err => {
                console.log('Cannot update todo', err)
                showErrorMsg('Cannot update todo')
            })
    }

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then((savedTodo) => {
                dispatch({ type: REMOVE_TODO, todoId })
                showSuccessMsg('Note removed')

            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })
    }

    function onTodoContentChange(ev, todo) {
        console.log('onTodoContentChange', ev.target.innerText, todo._id)
        const updatedTxt = ev.target.innerText
        const todoToSave = { ...todo, txt: updatedTxt }
        console.log('todoToSave', todoToSave)

        todoService.save(todoToSave)
            .then((savedTodo) => {
                dispatch({ type: UPDATE_TODO, todo: savedTodo })
                showSuccessMsg(`todo update`)
            })
            .catch(err => {
                console.log('Cannot update todo', err)
                showErrorMsg('Cannot update todo')
            })

    }


    function onAddTodo(ev) {
        ev.preventDefault()
        const todoToSave = todoService.getEmptyTodo()
        todoToSave.txt = ev.target.title.value

        todoService.save(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`todo added (id: ${savedTodo._id})`)
                dispatch({ type: ADD_TODO, todo: savedTodo })
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }



console.log('isLoading', isLoading)
    if (isLoading) return <div>Loading...</div>
    
    return (
        <section className="todoApp">
            <h1>Just Do It!</h1>
            
            <TodoFilter
                filterBy={filterBy}
                onSetFilter={debounceOnSetFilter.current}
            />
           
           <h4>Just Add it!</h4>
            <form onSubmit={onAddTodo}>
                <input type="text" placeholder="what need to be done?" name="title" />
                <button>Add Todo</button>
            </form>

 
            <TodoList
                todos={todos}
                onDoneToggle={onDoneToggle}
                onRemoveTodo={onRemoveTodo}
                onTodoContentChange={onTodoContentChange}
            />
        </section>
    )
}