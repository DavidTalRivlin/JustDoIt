
export function TodoFilter({filterBy, onSetFilter}) {


    function onSetFilterBy(ev) {
        ev.preventDefault()
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }
        const newfilter = { ...filterBy, [field]: value }
        onSetFilter(newfilter)
    }


   
    return (

        <section className="todo-filter">
            <h4>Just Filter</h4>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt">txt: </label>
                <input onChange={handleChange} type="text" id="txt" name="txt" />

                <select name="isDone" id="isDone" onChange={handleChange}>
                    <option value="All">All</option>
                    <option value="Done">Done It!</option>
                    <option value="Active">Do It!</option>
                </select>
            </form>

        </section>
    )
}