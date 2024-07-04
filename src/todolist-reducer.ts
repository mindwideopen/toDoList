import {FilterValuesType, TodolistType} from "./App";
import {v1} from "uuid";

export const todolistReducer = (state: TodolistType[], action: ACTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {

            return [{id: v1(), title: action.payload.newTodolistTitle, filter: "active"}, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {

            return state.map(tl => tl.id===action.payload.id ? {...tl, title: action.payload.newTodolistTitle}: tl )
        }
        case 'CHANGE-FILTER' : {

           return  state.map(tl => tl.id===action.payload.id ? {...tl, filter: action.payload.newFilter} : tl)

        }
            default: return state
    }

}

type ACTypes = RemoveToDoListACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

type RemoveToDoListACType = ReturnType<typeof removeToDoListAC>

export const removeToDoListAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload:
            {
                id: id
            }
    } as const
}

type addTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload:
            {
                newTodolistTitle: newTodolistTitle
            }
    } as const
}


type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (id: string, newTodolistTitle: string ) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload:
            {
                id: id,
                newTodolistTitle: newTodolistTitle
            }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>

export const changeFilterAC = (id: string, newFilter: FilterValuesType ) => {
    return {
        type: 'CHANGE-FILTER',
        payload:
            {
                id: id,
                newFilter: newFilter
            }
    } as const
}