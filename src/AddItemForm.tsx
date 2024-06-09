import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';



type AddItemFormPropsType = {
    addItem: (title: string) => void



}

export function AddItemForm (props: AddItemFormPropsType) {
    const [taskTitle, setTaskTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {

        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }



    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    return <div>
        <TextField id="outlined-basic"
                   label="Text"
                   variant="outlined"
                   className={error ? 'error' : ''}
                   value={taskTitle}
                   onChange={changeTaskTitleHandler}
                   onKeyUp={addTaskOnKeyUpHandler}
                   error={!!error}
        />



 <IconButton color={'primary'}   onClick={addTaskHandler}><AddIcon/></IconButton>
        {error && <div className={'error-message'}>{error}</div>}
    </div>
}