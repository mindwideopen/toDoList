import './App.css';
import {Todolist} from "./Todolist";
import React, {useReducer} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from "@mui/material/CssBaseline";
import {
    addTaskAC,
    addTodolistAC,
    changeTaskStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTaskAC
} from "./model/tasks-reducer";
import {
    changeTodolistFilter,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer";
import {changeModeAC, modeReducer} from "./model/mode-reducer";


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type ThemeMode = 'dark' | 'light'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const [themeMode, dispatchMode] = useReducer(modeReducer, 'dark')

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#087EA4',
            },
        },
    });

    const removeTask = (taskId: string, todolistId: string) => {

        dispatchTasks(removeTaskAC(todolistId, taskId))
    }

    const addTask = (title: string, todolistId: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {

        dispatchTasks(changeTaskStatusAC(todolistId, taskId, taskStatus))
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        dispatchTodolists(changeTodolistFilter(todolistId, filter))

    }

    const removeTodolist = (todolistId: string) => {

        dispatchTodolists(removeTodolistAC(todolistId))

        delete tasks[todolistId]

    }

    const addTodolist = (title: string) => {

        const action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)

    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatchTasks(updateTaskAC(todolistId,taskId ,title))
    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatchTodolists(changeTodolistTitleAC(todolistId, title))
    }

    const changeModeHandler = () => {
        dispatchMode(changeModeAC(themeMode))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map((tl) => {

                        const allTodolistTasks = tasks[tl.id]
                        let tasksForTodolist = allTodolistTasks

                        if (tl.filter === 'active') {
                            tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                        }

                        return (
                            <Grid>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App;
