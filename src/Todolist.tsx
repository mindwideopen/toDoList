import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent} from "react";

import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";





type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (filter: FilterValuesType,todolistId: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, taskStatus: boolean, todolistID: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, newTaskValue: string, todolistID: string) => void
}

export const Todolist = (props: PropsType) => {


    const changeFilterTasksHandler = (filter: FilterValuesType,todolistID: string) => {
        props.changeFilter(filter,todolistID)
    }
    const removeTodoList= () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {

        props.addTask(title, props.id)
    }

    return (
        <div>

            <h3>{props.title} <IconButton onClick={removeTodoList}>
                <Delete/>

            </IconButton>   </h3>

            <AddItemForm addItem={addTask} />

            <ul>
                        {props.tasks.map((task) => {

                            const removeTaskHandler = () => {
                                props.removeTask(task.id, props.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                props.changeTaskStatus(task.id, newStatusValue, props.id)
                            }

                            const changeTaskHandler = (newValue: string) => {

                                props.changeTaskTitle(task.id, newValue, props.id)
                            }

                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>


                                <EditableSpan  title={task.title} onChange={changeTaskHandler} />
                                <IconButton onClick={removeTaskHandler}>
                                    <Delete/>
                                </IconButton>


                            </li>
                        })}
                    </ul>

            <div>
                <Button  variant={props.filter === 'all' ? 'contained' : 'text' } title={'All'} onClick={()=> changeFilterTasksHandler('all', props.id)}>All</Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text' } title={'Active'} onClick={()=> changeFilterTasksHandler('active',  props.id)}>Active</Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed',  props.id)}>Completed</Button>
            </div>
        </div>
    )
}





