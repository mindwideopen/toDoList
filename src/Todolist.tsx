import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEventHandler, useState} from "react";
import React from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}


export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {

		setNewTaskTitle(e.currentTarget.value)
	}

	const addTaskFunction = () => {
		addTask(newTaskTitle)
		setNewTaskTitle('')}

	const filterAll = () => changeFilter('all')
	const filterActive = () => changeFilter('active')
	const filterCompleted = () => changeFilter('completed')

	const addTaskOnKeyUpHandler = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			addTaskFunction()
		}
	}





	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={newTaskTitle}  onChange={onChange} onKeyUp={addTaskOnKeyUpHandler}/>

				<button onClick={addTaskFunction} >+</button>
			</div>
			{	tasks.length === 0	? <p>Тасок нет</p> :
				<ul>
						{tasks.map(task => {

							const removeHandler = () => removeTask(task.id)

							return (
								<li key={task.id}>
									<input type="checkbox" checked={task.isDone}/>
									<span>{task.title}</span>
									<Button title={'x'} onClick={removeHandler}/>
								</li>
							)
						})}
				</ul>
			}
			<div>
				<Button title={'All'} onClick={filterAll}/>
				<Button title={'Active'} onClick={filterActive}/>
				<Button title={'Completed'} onClick={filterCompleted}/>
			</div>
		</div>
	)
}
