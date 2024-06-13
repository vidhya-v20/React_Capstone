import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
console.log("NewTodoForm component rendered"); 
const NewTodoForm = () => {
    console.log("NewTodoForm component rendered"); 
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userId, setUserId] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Low');
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [addedTodo, setAddedTodo] = useState(null);  // State to store the added todo details

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users from the API and populate the user select dropdown
        fetch("http://localhost:8083/api/users")
            .then(response => response.json())
            .then(users => {
                setUsers(users);
            });

        // Fetch categories from the API and populate the category select dropdown
        fetch("http://localhost:8083/api/categories")
            .then(response => response.json())
            .then(categories => {
                setCategories(categories);
            });
    }, []);

    const addNewTodo = () => {
        // Construct todo object
        const todoData = {
            userId,
            category,
            description,
            deadline,
            priority,
            completed: false // Assuming initially the task is not completed
        };

        // Send POST request to the API to add new todo task
        fetch("http://localhost:8083/api/todos", {
            method: "POST",
            body: JSON.stringify(todoData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(todo => {
            setAddedTodo(todo); // Store the added todo details
            setShowTaskDetails(true); // Show task details
        });
    };

    const handleBackToAddTask = () => {
        // Show form and hide card
        setShowTaskDetails(false);
    };

    const handleGotoUserTodos = () => {
        // Redirect to user dashboard
        navigate('/user-todos');
    };

    return (
        <main>
            <div className="container container-form">
                <h4>Create New Task</h4>
                <form>
                    <div className="mb-3">
                        <label htmlFor="userList" className="form-label">Users</label>
                        <select id="userList" name="Users" className="form-select" onChange={(e) => setUserId(e.target.value)}>
                            <option value="">Select a user</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryList" className="form-label">Category</label>
                        <select id="categoryList" name="category" className="form-select" onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea id="description" className="form-control" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">Deadline</label>
                        <input type="date" id="deadline" className="form-control" onChange={(e) => setDeadline(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="priority" className="form-label">Priority</label>
                        <select id="priority" className="form-select" onChange={(e) => setPriority(e.target.value)}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="form-control btn btn-dark" onClick={addNewTodo}>Add Task</button>
                    </div>
                </form>
                {showTaskDetails && addedTodo && (
                    <div className="card text-black mb-3">
                        <div className="card-header"><b>Added Todo Details</b></div>
                        <div className="card-body">
                            <p className="card-text"><b>User:</b> {users.find(user => user.id === userId)?.name}</p>
                            <p className="card-text"><b>Category:</b> {addedTodo.category}</p>
                            <p className="card-text"><b>Description:</b> {addedTodo.description}</p>
                            <p className="card-text"><b>Deadline:</b> {addedTodo.deadline}</p>
                            <p className="card-text"><b>Priority:</b> {addedTodo.priority}</p>
                            <div>
                                <button className="btn btn-danger" onClick={handleBackToAddTask}>Back to Add Task</button>
                                <button className="btn btn-danger" onClick={handleGotoUserTodos}>Go to User Dashboard</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default NewTodoForm;
