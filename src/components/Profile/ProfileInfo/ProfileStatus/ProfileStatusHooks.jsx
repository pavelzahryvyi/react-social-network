import React, {Component, useState} from 'react';

const ProfileStatusHooks = props => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    debugger;

    const activateMode = () => {
        setEditMode(true)
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        // props.updateStatus(this.state.status);
    };

    const onStatusChange = event => {
        setStatus(event.target.value);
    };


    return (
        <div>
            {!editMode && <div>
                    <span onDoubleClick={activateMode}>
                        {status || "aaa"}
                    </span>
            </div>}
            {editMode && <div>
                <input autoFocus onBlur={deactivateEditMode} onChange={onStatusChange} value={status}/>
            </div>
            }
        </div>
    )
};

export default ProfileStatusHooks