import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter
}

_createTodos()

function query(filterBy) {
    // return axios.get(BASE_URL).then(res => res.data)

    return storageService.query(STORAGE_KEY)
        .then(todos => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                todos = todos.filter(todo => regex.test(todo.txt))
            }
            console.log('filterBy.isDone', filterBy.isDone)
            if (filterBy.isDone === 'Done') {
                todos = todos.filter(todo => todo.isDone)
            } else if (filterBy.isDone === 'Active')
                todos = todos.filter(todo => !todo.isDone)
            return todos
        })
}



function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        // todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo() {
    return {
        txt: '',
        isDone: false,
        creator: 'user',
        createdAt: Date.now()
    }
}

function getDefaultFilter() {
    return { txt: '', isDone: '' }
}

function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = [
            { _id: utilService.makeId(), txt: 'strikethroughs', isDone: true, creator: 'user', createdAt: Date.now() },
            { _id: utilService.makeId(), txt: 'Lists', isDone: false, creator: 'user', createdAt: Date.now() },
            { _id: utilService.makeId(), txt: 'Irony', isDone: false, creator: 'user', createdAt: Date.now() },
            { _id: utilService.makeId(), txt: 'Lists', isDone: false, creator: 'user', createdAt: Date.now() },
            { _id: utilService.makeId(), txt: 'Repetition', isDone: false, creator: 'user', createdAt: Date.now() },
            { _id: utilService.makeId(), txt: 'Inconsistency', isDone: false, creator: 'user', createdAt: Date.now() }
        ]
        utilService.saveToStorage(STORAGE_KEY, todos)
    }
}