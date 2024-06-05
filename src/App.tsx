import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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

        let filteredTodolists = todolists.filter(tl => tl.id!=todolistID)
        setTodolists(filteredTodolists)
        delete tasks[todolistID]
        setTasks({...tasks})

    }

    function addTodolist (title:string) {
        debugger
        let newTodolist:TodolistType = {
            id:v1(),
            title: title,
            filter:"all"
        }
        setTodolists([newTodolist, ...todolists])
        setTasks({
            [newTodolist.id]: [{id: v1(), title: 'empty_task', isDone: true}],
                ...tasks
        })
    }



    const removeTask = (taskId: string, todolistID: string) => {

        const todolistTasks = tasks[todolistID]
        const filteredTasks = todolistTasks.filter(task => task.id !== taskId)
        tasks[todolistID] = filteredTasks
        setTasks({...tasks})
    }

    const addTask = (title: string, todolistID: string) => {
        const newTask = {id: v1(), title: title, isDone: false}

        tasks[todolistID] = [newTask, ...tasks[todolistID]]
        setTasks({...tasks})
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }


    const changeTaskStatus = (taskID: string, taskStatus: boolean, todolistID: string) => {
        tasks[todolistID].map(t =>
            t.id === taskID ? t.isDone = taskStatus : t
        )

        setTasks({...tasks})

    }

    const changeTaskTitle  = (taskID: string, newTaskTitle: string, todolistID: string) => {
debugger

       let changingTask =  tasks[todolistID].find(item => item.id===taskID)
if (changingTask) {
    changingTask.title=newTaskTitle
    setTasks({...tasks})
}

    }




    return (
        <div className="App">
            <AddItemForm addItem={ addTodolist}/>

            {todolists.map(tl => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
                }

                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
                }
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
                        changeTaskTitle={changeTaskTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
