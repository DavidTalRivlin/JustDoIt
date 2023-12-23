
export function TodoPreview({todo, onDoneToggle, onRemoveTodo, onTodoContentChange}) {



    return (

        <section>
            <i className={`far ${(todo.isDone) ? 'fa-check-square' : 'fa-square'}`}
                onClick={() => onDoneToggle(todo._id)}></i>

            <label
                className="to-do-label to-do-txt content-editable-placeholder notes-inner-txt"
                id="todo-label"
                style={{ textDecorationLine: todo.isDone ? 'line-through' : 'none' }}
                htmlFor="todoItem"
                contentEditable="true"
                spellCheck="false"
                suppressContentEditableWarning={true}
                onBlur={(event) => onTodoContentChange(event, todo._id)}>
                {todo.txt}
            </label>

            <button
                className="todo-list-btn btn clean-btn"
                onClick={() => onRemoveTodo(todo._id)}>
                <img className="icon-remove-todo" src="./assets/icons/icon-remove.png" alt="" />
            </button>

        </section >
    )
}