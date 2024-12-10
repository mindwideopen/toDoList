import {TasksStateType} from "../App";
import {v1} from "uuid";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK' : {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]?.filter(tasks => tasks.id !== action.payload.taskID)
            }
        }
        case 'ADD_TASK' : {
            const newTask = {
                id: v1(),
                title: action.payload.taskID,
                isDone: false
            }
            const newTodolistTasks = {
                ...state,
                [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]
            }
            return (newTodolistTasks)
        }
        case 'CHANGE-TASK-STATUS': {

            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id == action.payload.taskID ? {
                    ...t,
                    isDone: action.payload.newStatusValue
                } : t)
            }
        }
        case 'UPDATE-TASK': {

            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    title: action.payload.title
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistID]: []}

        }

        default:
            return state
    }
}


type ActionType = removeTaskACType |
    addTaskACType |
    changeTaskStatusACType |
    updateTaskACType |
    addTodolistACType


type removeTaskACType = ReturnType<typeof removeTaskAC>

type addTaskACType = ReturnType<typeof addTaskAC>

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>

type updateTaskACType = ReturnType<typeof updateTaskAC>

export type addTodolistACType = ReturnType<typeof addTodolistAC>


export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'REMOVE_TASK',
        payload: {
            todolistID,
            taskID
        }
    } as const
}

export const addTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistID,
            taskID
        }
    } as const
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, statusValue: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistID,
            taskID,
            newStatusValue: statusValue

        }
    } as const
}


export const updateTaskAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: 'UPDATE-TASK',
        payload: {
            todolistID,
            taskID,
            title
        }
    } as const
}

export const addTodolistAC = (todolistTile: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistID: v1(),
            todolistTile: todolistTile
        }
    } as const
}