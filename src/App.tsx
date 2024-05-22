import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
	const [tasks, setTasks] = useState<TaskType[]>([
		{id: v1(), title: 'HTML&CSS', isDone: true},
		{id: v1(), title: 'JS', isDone: true},
		{id: v1(), title: 'ReactJS', isDone: false},
		{id: v1(), title: 'Redux', isDone: false},
		{id: v1(), title: 'Typescript', isDone: false},
		{id: v1(), title: 'RTK query', isDone: false},
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	const removeTask = (taskId: string) => {
		const filteredTasks = tasks.filter((task) => {
			return task.id !== taskId
		})
		setTasks(filteredTasks)
	}

	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	let tasksForTodolist = tasks
	if (filter === 'active') {
		tasksForTodolist = tasks.filter(task => !task.isDone)
	}

	if (filter === 'completed') {
		tasksForTodolist = tasks.filter(task => task.isDone)
	}
	function addTask (title:string)  {
		let newTask = {
			id: v1(),
			title: title,
			isDone: false
		}
		let updatedTasks = [newTask,...tasks]
		setTasks(updatedTasks)
	}function changeStatus (taskID:string, isDone: boolean) {
		let task = tasks.find(t => t.id === taskID)
// task holds link that leads to
		if(task) {
			task.isDone=isDone
		}
		let copy = [...tasks]
		setTasks(copy)


	}

	return (
		<div className="App">
			<Todolist title="Важные дела"
			          tasks={tasksForTodolist}
			          removeTask={removeTask}
			          changeFilter={changeFilter}
					  addTask ={addTask}
					  setSaskStatus={changeStatus}
			/>
		</div>
	);
}

export default App;
