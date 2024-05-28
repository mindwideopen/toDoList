import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent,  useState} from "react";
import React from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
	setSaskStatus:(taskID:string, isDone: boolean) => void
}


export const Todolist = (props: PropsType) => {
	let [newTaskTitle, setNewTaskTitle] = useState('')

	// const setErrorFalse = () => {
	// 	setError(false)
	//
	// }
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {

		setNewTaskTitle(e.currentTarget.value)
	}
	let [error, setError] = useState<boolean>(false)

	const addTaskFunction = () => {
		if (newTaskTitle.trim()==='') {
			setError(true)
			}
		else {
			props.addTask(newTaskTitle)
			setNewTaskTitle('')
		}
		}



	const filterAll = () => props.changeFilter('all')
	const filterActive = () => props.changeFilter('active')
	const filterCompleted = () => props.changeFilter('completed')

	const addTaskOnKeyUpHandler = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter') {
			addTaskFunction()
		}
	}


	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input className={error?'error':undefined}
					   value={newTaskTitle}
					   onChange={onChange}
					   onKeyUp={addTaskOnKeyUpHandler}
					   onFocus={()=> setError(false)}
					   />


				<button onClick={addTaskFunction} >+</button>

				{error ? <div className="error">error</div>: false}
			</div>
			{	props.tasks.length === 0	? <p>Тасок нет</p> :
				<ul>
						{props.tasks.map(task => {

							const removeHandler = () => props.removeTask(task.id)
							const changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
								props.setSaskStatus(task.id, e.currentTarget.checked)

							}

							return (
								<li key={task.id}>
									<input type="checkbox"
										   checked={task.isDone}
										   onChange={changeStatusHandler}/>

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
