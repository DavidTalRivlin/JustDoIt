const { useEffect } = React
const { useSelector, useDispatch } = ReactRedux

import { todoService } from "../services/todo.service.js";
import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { SET_TODOS, REMOVE_TODO, ADD_TODO, UPDATE_TODO } from "../store/store.js";
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

export function TodoApp() {
    const dispatch = useDispatch()
    const todos = useSelector(storeState => storeState.todos)


    useEffect(() => {
        loadTodos()
        // setSearchParams(filterBy)
        // }, [filterBy])
    }, [])


    function loadTodos() {
        todoService.query()
            // todoService.query(filterBy)
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })

            })
            .catch(err => console.log('err:', err))
    }


    function onDoneToggle(todo) {
        const updatedIsDone = todo.isDone = !todo.isDone
        const todoToSave = { ...todo, updatedIsDone }

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

    function onTodoContentChange(ev, todoId) {
        console.log('nTodoContentChange', ev.target.value, todoId)
    }


    function onAddTodo(ev) {
        ev.preventDefault()
        const todoToSave = todoService.getEmptyTodo()
        todoToSave.txt = ev.target.title.value
        
        todoService.save(todoToSave)
        .then((savedTodo) => {
            showSuccessMsg (`todo added (id: ${savedTodo._id})`)
            dispatch ({ type: ADD_TODO, todo: savedTodo})
        })
            .catch(err => {
            console.log('Cannot add todo', err)
            showErrorMsg('Cannot add todo')
        })
    }

    
            
    

    if (!todos) return <div>Loading...</div>

    return (
        <section className="todoApp">
            <h1>Hello World!</h1>
            <TodoList
                todos={todos}
                onDoneToggle={onDoneToggle}
                onRemoveTodo={onRemoveTodo}
                onTodoContentChange={onTodoContentChange}
            />
            <form onSubmit={onAddTodo}>
                <input type="text" placeholder="what need to be done?" name="title"  />
                <button>Add Todo</button>
                
            </form>

            <TodoFilter />
        </section>
    )
}