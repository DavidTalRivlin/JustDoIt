import { TodoPreview } from "./TodoPreview.jsx";

export function TodoList({todos, onDoneToggle, onRemoveTodo, onTodoContentChange}) {





    return (
        <ul>
            {todos.map(todo =>
                <li className="todo-list" key={todo._id}>
                    <TodoPreview
                        todo={todo}
                        onDoneToggle={onDoneToggle}
                        onRemoveTodo={onRemoveTodo}
                        onTodoContentChange={onTodoContentChange}
                    />
                </li>
            )}
        </ul>




    )
}