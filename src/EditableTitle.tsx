import React, {ChangeEvent, useState} from 'react';

type EditableTitlePropsType = {
    title: string;
    callBack: (newTodolistTitle: string)=> void
}


export const EditableTitle = (props:EditableTitlePropsType) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [todolistTitle, setTodolistTitle] = useState(props.title)

    const editHandler = () => {
        setEditMode(!editMode)
        if (editMode) {
            updateTodolistTitleHandler()
        }
    }


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistTitle(e.currentTarget.value)

    }
    const updateTodolistTitleHandler = ( ) => {
        props.callBack(todolistTitle)

    }
    return (
        editMode ?
            <input value={todolistTitle} onChange={onChangeTitleHandler} onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.title} </span>
    );
};

export default EditableTitle;