import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {Button} from "./Button";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";





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

            <h3>{props.title} <button onClick={removeTodoList}>X</button>  </h3>

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
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan  title={task.title} onChange={changeTaskHandler} />
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>

            <div>
                <Button className={props.filter === 'all' ? 'active-filter' : '' } title={'All'} onClick={()=> changeFilterTasksHandler('all', props.id)}/>
                <Button className={props.filter === 'active' ? 'active-filter' : '' } title={'Active'} onClick={()=> changeFilterTasksHandler('active',  props.id)}/>
                <Button className={props.filter === 'completed' ? 'active-filter' : '' } title={'Completed'} onClick={()=> changeFilterTasksHandler('completed',  props.id)}/>
            </div>
        </div>
    )
}





