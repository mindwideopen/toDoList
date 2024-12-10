import {FilterValuesType, TaskType, TodolistType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./model/store";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "./model/tasks-reducer";
import {changeTodolistFilter, changeTodolistTitleAC, removeTodolistAC} from "./model/todolists-reducer";



type PropsType = {
    todolist: TodolistType
}

export const Todolist = (props: PropsType) => {
    const {  todolist} = props

    const {id, title, filter} = todolist
    const dispatch = useDispatch()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])


    const addTask = (title: string) => {
        dispatch(addTaskAC(id, title))
    }
    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    const updateTodolist = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }

    // const changeFilterTasksHandler = (filter: FilterValuesType) => {
    //     changeFilter(filter, props.todolistId)
    // }



    const addTaskCallback = (title: string) => {
        addTask(title)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(id, title)
    }
     const allTodolistTasks = tasks
     let tasksForTodolist = allTodolistTasks

    if (filter === 'active') {
         tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
     }

     if (filter === 'completed') {
         tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
     }


    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {
                tasksForTodolist.length === 0
                    ? <p>Тасок нет</p>
                    :
                    <List>
                        {
                            tasksForTodolist.map((task) => {

                            const removeTaskHandler = () => {
                                dispatch(removeTaskAC(id, task.id))
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                dispatch(changeTaskStatusAC(id, task.id, newStatusValue))
                            }

                            const changeTaskTitleHandler = (title: string) => {
                                dispatch(updateTaskAC(id,task.id ,title))
                            }
                            return <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={() => dispatch(changeTodolistFilter(id, 'all'))}>
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={() => dispatch(changeTodolistFilter(id, 'active'))}>
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={() => dispatch(changeTodolistFilter(id, 'completed'))}>
                    Completed
                </Button>
            </Box>
        </div>
    )
}
