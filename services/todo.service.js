import { func } from 'prop-types'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'todoDB'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo
}

_createTodos()

function query() {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
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
        todo.owner = userService.getLoggedinUser()
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

function _createTodos() {
    let todos = utilService.loadFromStorage(STORAGE_KEY)
    console.log('inside _createTodos')
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