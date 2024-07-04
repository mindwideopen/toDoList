import {v1} from "uuid";

import {TodolistType} from "./App";
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeToDoListAC,
    todolistReducer
} from "./todolist-reducer";

test('remove correct todolist', () => {
     let todolistID1 = v1()
     let todolistID2 = v1()

    let startState: TodolistType[] =  [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
        ]

    // const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST'})
const endState = todolistReducer(startState, removeToDoListAC(todolistID1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
 })

test('add todolist', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()
    const newTodolistTitle = 'New Todolist'

    let startState: TodolistType[] =  [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    // const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST'})
    const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
})

test('change todolist todolist title', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const newTodolistTitle = 'New Todolist Title'



    let startState: TodolistType[] =  [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]


    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistID1, newTodolistTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTodolistTitle)
})


test ('filter test', () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const newFilter = 'newFilter'



    const  startState: TodolistType[] =  [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistReducer(startState, changeFilterAC(todolistID1, newFilter))
    expect(endState[0].filter).toBe(newFilter)
    expect(endState[1].filter).toBe('all')
})