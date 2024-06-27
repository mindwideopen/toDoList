import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Box} from "@mui/material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]: [
            {id:v1() , title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const removeToDoList = (todolistID: string) => {

        setTodolists (todolists.filter(tl => tl.id !== todolistID ))
        delete tasks[todolistID]
    }

    function addTodolist (title:string) {

        let newTodolist:TodolistType = {
            id:v1(),
            title: title,
            filter:"all"
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({
            [newTodolist.id]: [{id: v1(), title: '', isDone: true}],
                ...tasks
        })
    }



    const removeTask = (taskId: string, todolistID: string) => {


         setTasks({...tasks, [todolistID]: tasks[todolistID].filter ( task => task.id!==taskId)})
    }
    const addTask = (title: string, todolistID: string) => {

        const newTask = {id: v1(), title: title, isDone: false}

        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const changeFilter = (filter: FilterValuesType, todolistId: string) => {

        setTodolists(todolists.map(tl => tl.id===todolistId ? {...tl, filter} : tl))
    }
    const changeTaskStatus = (taskID: string, taskStatus: boolean, todolistID: string) => {

        setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id===taskID ? {...task, isDone:taskStatus} : task)
    })
    }
    const updateTaskTitle  = ( newTaskTitle: string, taskID: string,  todolistID: string) => {

        setTasks({...tasks, [todolistID]:tasks[todolistID].map(task => task.id===taskID ? {...task, title: newTaskTitle}: task )})

    }
    const updateTodoListTitle = (newTodolistTitle: string, todolistID: string) => {
        console.log('newTodolistTitle', newTodolistTitle)

        setTodolists(todolists.map(tl => tl.id===todolistID ? {...tl, title: newTodolistTitle}: tl ))
    }




    return (

        <div className="App">
            <Box bgcolor={'rgba(126, 217,58,0.3)'}  >
            <AddItemForm addItem={ addTodolist}/>
            </Box>

            {todolists.map(tl => {
                 let tasksForTodolist = tasks[tl.id]
                // if (tl.filter === 'active') {
                //     tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                // }
                //
                // if (tl.filter === 'completed') {
                //     tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                // }
                return (
                    <Todolist
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        removeTodolist={removeToDoList}
                        updateTaskTitle={updateTaskTitle}
                        updateTodoListTitle={updateTodoListTitle}
                    />
                )
            })}

        </div>
    );
}

export default App;
