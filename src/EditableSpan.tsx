import React, {ChangeEvent, useState} from 'react';


export type EditableSpanPropsType = {
    oldTitle: string
    callBack: (newTaskTitle: string) => void

}


export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.oldTitle)





    const editHandler = () => {
        setEditMode(!editMode)
        if (editMode) {
            updateTitleHandler()
        }
        }


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

    }
    const updateTitleHandler = ( ) => {
        props.callBack(newTitle)

    }


    return (
        editMode ?
            <input value={newTitle} onChange={onChangeTitleHandler} onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle} </span>
    );
};

