import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";

export function TodoApp(){


return (
    <section className="todoApp">
            <h1>Hello World!</h1>
            <TodoList/>
            <TodoFilter/>
    </section>
)
}