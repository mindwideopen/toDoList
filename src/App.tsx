import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type ToDoListType = {
	id: string,
	title: string,
	filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: false},
		{id: v1(), title: 'JS', isDone: false},
		{id: v1(), title: 'ReactJS', isDone: false},
		{id: v1(), title: 'Redux', isDone: false},
		{id: v1(), title: 'Typescript', isDone: false},
		{id: v1(), title: 'RTK query', isDone: false},
	])

	// const [filter, setFilter] = useState<FilterValuesType>('all')

	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter(task => task.id !== taskId)
		setTasks(filteredTasks)
	}




	function addTask (title:string)  {
		let newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		let updatedTasks = [newTask,...tasks]
		setTasks(updatedTasks)
	}
	
	function changeStatus (taskID:string, isDone: boolean, todolistID: string) {

		let task = tasks.find(t => t.id === taskID)

		if(task) {
			task.isDone=isDone
		}
		console.log(tasks)

		let copy = [...tasks]
		setTasks(copy)


	}
	function changeFilter  (filterValue: FilterValuesType, todolistID:string)  {
		let todolist = toDoLists.find(item => item.id === todolistID)
		if (todolist) {
			todolist.filter = filterValue
			setToDoList([...toDoLists])
		}
	}


		const [toDoLists, setToDoList] = useState<Array<ToDoListType>>([
			{id:v1(),	title:'First todolist', filter: 'all' },
			{id:v1(),	title:'Second todolist', filter: 'completed'}
		])







	return (
		<div className="App">
			{toDoLists.map(item => {

				let tasksForTodolist = tasks
				if (item.filter === 'active') {
					tasksForTodolist = tasks.filter(task => !task.isDone)
				}

				if (item.filter === 'completed') {
					tasksForTodolist = tasks.filter(task => task.isDone)
				}

				return <Todolist title={item.title}
								 tasks={tasksForTodolist}
								 removeTask={removeTask}
								 changeFilter={changeFilter}
								 addTask ={addTask}
								 setSaskStatus={changeStatus}
								 filter={item.filter}
								 id={item.id}
				/>
			})}


		</div>
	);
}

export default App;
