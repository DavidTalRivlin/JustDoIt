import { todoService } from "../services/todo.service.js";
import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { func } from "prop-types";

const { useState, useEffect } = React

export function TodoApp() {

    const [todos, setTodos] = useState(null)

    useEffect(() => {
        loadTodos()
        // setSearchParams(filterBy)
        // }, [filterBy])
    }, [])


function onDoneToggle(todoId){
    console.log('ondonetoggle', todoId)
}

function onRemoveTodo(todoId){
    console.log('onRemoveTodo', todoId)
}

function onTodoContentChange(ev, todoId){
    console.log('nTodoContentChange',ev.target.value, todoId )
}




    function loadTodos() {
        todoService.query()
            // todoService.query(filterBy)
            .then(setTodos)
            .catch(err => console.log('err:', err))
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
            <TodoFilter />
        </section>
    )
}