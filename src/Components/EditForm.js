import React from 'react';

const EditForm = ({ editTask, handleEditChange, handleEdit, categories }) => {
    return (
        <div className="edit-form">
            <h3>Edit Task</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                <input
                    name="description"
                    value={editTask.description}
                    onChange={handleEditChange}
                    placeholder="Description"
                />
                <select
                    name="category"
                    value={editTask.category}
                    onChange={handleEditChange}
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input
                    type="date"
                    name="deadline"
                    value={editTask.deadline}
                    onChange={handleEditChange}
                />
                <select
                    name="priority"
                    value={editTask.priority}
                    onChange={handleEditChange}
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select
                    name="completed"
                    value={editTask.completed}
                    onChange={handleEditChange}
                >
                    <option value={false}>Pending</option>
                    <option value={true}>Completed</option>
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default EditForm;
