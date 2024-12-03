import {TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
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
            const newTodolistTasks = {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
            return (newTodolistTasks)
        }

    }
}




type ActionType = removeTaskACType | addTaskACType


type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>

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