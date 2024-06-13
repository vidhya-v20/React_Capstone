import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewTodoForm = () => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [userId, setUserId] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('Low');
    const [showTaskDetails, setShowTaskDetails] = useState(false);
    const [addedTodo, setAddedTodo] = useState(null);  
    const [taskAdded, setTaskAdded] = useState(false); // Track whether task has been added successfully

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
            completed: false
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
            setAddedTodo(todo); 
            setShowTaskDetails(true); 
            setTaskAdded(true); // Set taskAdded to true once task is added successfully
        });
    };

    const handleBackToAddTask = () => {
        setShowTaskDetails(false);
    };

    const handleGotoUserTodos = () => {
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
                {/* Show success message if taskAdded is true */}
                {taskAdded && <p>Task added successfully</p>}
                {/* Your card to display added task details */}
                {/* Your card to display added task details */}
            </div>
        </main>
    );
};

export default NewTodoForm;
