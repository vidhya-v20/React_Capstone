import React from 'react';

const TodoCard = ({ task, handleToggle, handleRemove, handleEdit }) => {
    return (
        <div className="card todo-card">
            <div className="card-header todo-category-header">
                <p>
                    <span className={`todo-category-title todo-category-color-dot bg-${task.categoryColor}`}></span>
                    <span className="todo-category-title">&nbsp;&nbsp;{task.category}&nbsp;</span>
                    <span className={`text-bg-${task.priority.toLowerCase()}`}>{task.priority}</span>
                    <span className="todo-icons bg-light">
                        <i className="bi bi-pencil-square" onClick={() => handleEdit(task)}></i>
                        <i className="bi bi-trash" onClick={() => handleRemove(task.id)}></i>
                        <span data-bs-toggle="tooltip" title="Toggle completion status" onClick={() => handleToggle(task.id)}>
                            <i className={`bi ${task.completed ? 'bi-x-circle-fill' : 'bi-check-circle-fill'}`}></i>
                        </span>
                    </span>
                </p>
            </div>
            <div className="card-body todo-body">
                <div className="row">
                    <div className="col-9">
                        <h6 className="card-title todo-desc">
                            {task.completed ? <s>{task.description}</s> : task.description}
                        </h6>    
                    </div>
                    <div className="col-3">
                        {/* Additional space for future use */}
                    </div>
                </div>
                <p className="card-text">
                    <i className="bi bi-calendar3"></i>&nbsp;&nbsp;
                    {task.completed ? <s>Due date: {task.deadline}</s> : `Due date: ${task.deadline}`}
                </p>
                <p className="card-text">
                    <strong>Status: </strong>{task.completed ? 'Completed' : 'Pending'}
                </p>
            </div>
        </div>
    );
};

export default TodoCard;
