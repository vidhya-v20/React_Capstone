import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation } from '@fortawesome/free-solid-svg-icons';

const TodoCard = ({ task, handleToggle, handleRemove, handleEdit }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                    <h5 className="card-title">{task.category}</h5>
                    </div>
                    <div>
                    <p className="card-subtitle text-muted">{task.description}</p> {/* Display category here */}
                    
                       
                    </div>
                    <div className="mx-3">
                        <span>{task.deadline}</span>
                    </div>
                    <div>
                        {task.completed ? (
                            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                        ) : (
                            <FontAwesomeIcon icon={faExclamation} style={{ color: 'red' }} />
                        )}
                    </div>
                    <div>
                        <button onClick={() => handleToggle(task.id)} className="btn btn-secondary btn-sm mx-1">Toggle</button>
                        <button onClick={() => handleEdit(task)} className="btn btn-primary btn-sm mx-1">Edit</button>
                        <button onClick={() => handleRemove(task.id)} className="btn btn-danger btn-sm mx-1">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoCard;
