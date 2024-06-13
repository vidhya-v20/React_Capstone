import React from 'react';

const ToDo = ({ index, task, handleToggle, handleRemove, handleEdit }) => {
    return (
        <li>
            <span
                style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                onClick={handleToggle}
            >
                {task.taskName}
                {task.description}
            </span>
            <button onClick={() => handleRemove(index)}>Remove</button>
            <button onClick={handleEdit}>Edit</button>
        </li>
    );
};

export default ToDo;

