import React, { useReducer, useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import Sidebar from './Sidebar';
import UserDropdown from './UserDropdown';
import './StickyNotes.css'; // Import the CSS file


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the required icons


// Reducer function to manage state transitions
const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                ...state,
                userTasks: [...state.userTasks, action.payload]
            };
        case 'REMOVE_TASK':
            return {
                ...state,
                userTasks: state.userTasks.filter(task => task.id !== action.payload)
            };
        case 'EDIT_TASK':
            return {
                ...state,
                userTasks: state.userTasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                )
            };
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            };
        case 'SET_USER_TASKS':
            return {
                ...state,
                userTasks: action.payload
            };
        case 'TOGGLE_TASK':
            return {
                ...state,
                userTasks: state.userTasks.map(task =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                )
            };
        default:
            return state;
    }
};

const ToDoList = () => {
    const initialState = {
        input: '',
        users: [],
        userTasks: []
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [input, setInput] = useState(initialState.input);
    const [selectedUser, setSelectedUser] = useState('');
    const [editTask, setEditTask] = useState(null);
    const [filter, setFilter] = useState('ALL');
    const [priorityFilter, setPriorityFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);
    const [userCounts, setUserCounts] = useState({});

    useEffect(() => {
        fetch('http://localhost:8083/api/users')
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'SET_USERS', payload: data });
            })
            .catch(error => console.error('Error fetching users:', error));

        fetch('http://localhost:8083/api/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (selectedUser) {
            fetch(`http://localhost:8083/api/todos/byuser/${selectedUser}`)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: 'SET_USER_TASKS', payload: data });
                    calculateCounts(data);
                })
                .catch(err => {
                    console.error('Error fetching todos:', err);
                });
        } else {
            dispatch({ type: 'SET_USER_TASKS', payload: [] });
            calculateCounts([]);
        }
    }, [selectedUser]);

    const calculateCounts = (todos) => {
        const counts = {
            completed: 0,
            pending: 0,
            high: 0,
            medium: 0,
            low: 0,
            personal: 0,
            household: 0,
            financial: 0,
            work: 0,
            errand: 0,
            help: 0,
            total: 0
        };

        todos.forEach(todo => {
            if (todo.completed) {
                counts.completed++;
            } else {
                counts.pending++;
            }

            switch (todo.priority.toLowerCase()) {
                case 'high':
                    counts.high++;
                    break;
                case 'medium':
                    counts.medium++;
                    break;
                case 'low':
                    counts.low++;
                    break;
                default:
                    break;
            }

            switch (todo.category.toLowerCase()) {
                case 'personal task':
                    counts.personal++;
                    break;
                case 'household task':
                    counts.household++;
                    break;
                case 'financial task':
                    counts.financial++;
                    break;
                case 'work task':
                    counts.work++;
                    break;
                case 'errand':
                    counts.errand++;
                    break;
                case 'help others':
                    counts.help++;
                    break;
                default:
                    break;
            }

            counts.total++;
        });

        setUserCounts(counts);
    };

    const handleAdd = () => {
        if (!input || !selectedUser) return;
        const newTask = {
            userid: selectedUser,
            description: input,
            category: categories[0].name,
            deadline: "2024-12-31",
            priority: "Medium",
            completed: false,
            categoryColor: "primary"
        };

        fetch(`http://localhost:8083/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'ADD_TASK', payload: data });
                setInput('');
                calculateCounts([...state.userTasks, data]);
            })
            .catch(err => {
                console.error('Error adding task:', err);
            });
    };

    const handleRemove = (id) => {
        fetch(`http://localhost:8083/api/todos/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                dispatch({ type: 'REMOVE_TASK', payload: id });
                calculateCounts(state.userTasks.filter(task => task.id !== id));
            })
            .catch(err => {
                console.error('Error removing task:', err);
            });
    };

    const handleEdit = () => {
        if (!editTask || !editTask.description) return;

        fetch(`http://localhost:8083/api/todos/${editTask.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editTask)
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'EDIT_TASK', payload: data });
                setEditTask(null);
                calculateCounts(state.userTasks.map(task => task.id === data.id ? data : task));
            })
            .catch(err => {
                console.error('Error editing task:', err);
            });
    };

    const handleToggle = (id) => {
        const task = state.userTasks.find(task => task.id === id);
        if (task) {
            fetch(`http://localhost:8083/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...task, completed: !task.completed })
            })
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: 'EDIT_TASK', payload: data });
                    calculateCounts(state.userTasks.map(task => task.id === data.id ? data : task));
                })
                .catch(err => {
                    console.error('Error toggling task:', err);
                });
        }
    };

    const handleUserChange = (e) => {
        const userId = e.target.value;
        setSelectedUser(userId);
    };

    const handleEditChange = (e) => {
        setEditTask({ ...editTask, [e.target.name]: e.target.value });
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handlePriorityFilterChange = (e) => {
        setPriorityFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTasks = state.userTasks.filter((task) => {
        const statusMatch = (filter === 'ALL') || (filter === 'COMPLETED' && task.completed) || (filter === 'PENDING' && !task.completed);
        const priorityMatch = (priorityFilter === 'ALL') || (priorityFilter === task.priority);
        const searchMatch = task.description.toLowerCase().includes(searchQuery.toLowerCase());

        return statusMatch && priorityMatch && searchMatch;
    });

    return (
        <div>
            <Sidebar />
            <div className="container">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a task"
                />
              <button className="add-button" onClick={handleAdd}>
    <FontAwesomeIcon icon={faPlus} className="plus-icon" />
    <span>Add</span>
</button>
                {editTask && (
                    <div>
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
                )}
                <UserDropdown users={state.users} selectedUser={selectedUser} handleUserChange={handleUserChange} />
                <select value={filter} onChange={handleFilterChange}>
                    <option value="ALL">ALL</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="PENDING">Pending</option>
                </select>
                <select value={priorityFilter} onChange={handlePriorityFilterChange}>
                    <option value="ALL">ALL</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={handleSearchChange} 
                    placeholder="Search tasks" 
                />
                <div id="todo-cards">
                    {filteredTasks.map((task) => (
                        <TodoCard
                            key={task.id}
                            task={task}
                            handleToggle={handleToggle}
                            handleRemove={handleRemove}
                            handleEdit={setEditTask}
                        />
                    ))}
                </div>
                <div className="sticky-notes-container">
                    <div className="sticky-note">
                        <FontAwesomeIcon icon={faThumbtack} className="thumbtack" />
                        <h3>Pending item Priority Counts:</h3>
                        <ul>
                            <li>Low: {state.userTasks.filter(task => !task.completed && task.priority === 'Low').length}</li>
                            <li>Medium: {state.userTasks.filter(task => !task.completed && task.priority === 'Medium').length}</li>
                            <li>High: {state.userTasks.filter(task => !task.completed && task.priority === 'High').length}</li>
                        </ul>
                    </div>
                    <div className="sticky-note">
                        <FontAwesomeIcon icon={faThumbtack} className="thumbtack" />
                        <h3>User status Counts:</h3>
                        <ul>
                            <li>Pending Tasks: {userCounts.pending}</li>
                            <li>Completed Tasks: {userCounts.completed}</li>
                        </ul>
                    </div>
                    <div className="sticky-note">
                        <FontAwesomeIcon icon={faThumbtack} className="thumbtack" />
                        <h3>Category-wise Counts:</h3>
                        <ul>
                            <li>Personal Tasks: {userCounts.personal}</li>
                            <li>Household Tasks: {userCounts.household}</li>
                            <li>Financial Tasks: {userCounts.financial}</li>
                            <li>Work Tasks: {userCounts.work}</li>
                            <li>Errands: {userCounts.errand}</li>
                            <li>Help Others: {userCounts.help}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ToDoList;
