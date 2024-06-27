import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent} from "react";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";








type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, taskStatus: boolean, todolistID: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistID: string) => void
    updateTaskTitle: (newTaskTitle: string, taskID: string,  todolistID: string) => void
    updateTodoListTitle: (newTodolistTitle: string, todolistID: string) => void
}

export const Todolist = (props: PropsType) => {




    const changeFilterTasksHandler = (filter: FilterValuesType, todolistID: string) => {
        props.changeFilter(filter, todolistID)
    }
    const removeTodoList = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {

        props.addTask(title, props.id)
    }
    const updateTodoListTitleHandler = (newTodoListTitle: string) => {
        props.updateTodoListTitle(newTodoListTitle, props.id)

    }


    return (
        <div>

            <h3><EditableSpan oldTitle={props.title} callBack={updateTodoListTitleHandler}/> <IconButton onClick={removeTodoList}>
                <Delete/>

            </IconButton></h3>

            <AddItemForm addItem={addTask}/>





                <ul>
                    {/*{props.tasks.map((task) => {*/}

                    {
                        props.tasks.filter(t => {
                            return props.filter === 'all' ? t :
                                props.filter === 'active' ? !t.isDone :
                                    t.isDone

                        }).map((task) => {

                            const removeTaskHandler = () => {
                                props.removeTask(task.id, props.id)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                props.changeTaskStatus(task.id, newStatusValue, props.id)
                            }

                            const updateTaskTitleHandler = (newTaskTitle: string) => {

                                props.updateTaskTitle(newTaskTitle, task.id, props.id )
                            }


                            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>


                                <EditableSpan oldTitle={task.title} callBack={updateTaskTitleHandler}/>

                                <IconButton onClick={removeTaskHandler}>
                                    <Delete/>
                                </IconButton>


                            </li>
                        })}
                </ul>


            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} title={'All'}
                        onClick={() => changeFilterTasksHandler('all', props.id)}>All</Button>
                <Button color={'primary'} variant={props.filter === 'active' ? 'contained' : 'text'} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active', props.id)}>Active</Button>
                <Button color={'secondary'} variant={props.filter === 'completed' ? 'contained' : 'text'}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed', props.id)}>Completed</Button>
            </div>
        </div>
    )
}





