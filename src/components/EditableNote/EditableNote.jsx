import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';

function EditableNote ({initialValue, noteKey }) {
    const dispatch = useDispatch();
    let [isEditing, setIsEditing] = useState(false)
    let [value, setValue] = useState(initialValue)
    const { toolId } = useParams();
    console.log('THIS IS THE INITIAL VALUE:', initialValue);

    const handleClick = (event) => {
        if (event.key && event.key !== 'Enter'){
            return;
          }
        if (isEditing === true) {
            //DISPATCH HERE WITH VALUE BEING EDITED, AND NOTEKEY, AND TOOLID
            dispatch({ type: 'UPDATE_GEAR_NOTE', payload: {note: value, noteKey: noteKey, id: toolId} });
        }
        setIsEditing(!isEditing)
    }

    return (
        <>
            {initialValue && (
                <div>
                    {isEditing ?
                    <input type="text" value={value || ''} onChange={(event) => {setValue(event.target.value)}}
                    onKeyDown={handleClick}/>
                    :
                    <span>{initialValue}</span>}&nbsp;
                    <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
                </div>
            )}
        </>
    )
}

export default EditableNote;