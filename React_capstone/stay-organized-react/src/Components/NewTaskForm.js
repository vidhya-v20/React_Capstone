import React, { useState } from 'react';

const NewTaskForm = ({ categories, handleAdd }) => {
    const [input, setInput] = useState('');
    const [category, setCategory] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the parent component's handleAdd function with the task details
        handleAdd({ description: input, category, deadline, priority });
        // Reset form fields
        setInput('');
        setCategory('');
        setDeadline('');
        setPriority('');
    };


    
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="form-control"
                    placeholder="Add a new task"
                    required
                />
            </div>
            <div className="mb-3">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="form-control"
                    required
                />
            </div>
            <div className="mb-3">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="form-select"
                    required
                >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
        </form>
    );
};

export default NewTaskForm;
