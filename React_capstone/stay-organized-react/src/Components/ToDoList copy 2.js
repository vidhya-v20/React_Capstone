import React, { useReducer, useEffect, useState } from 'react';
import TodoCard from './TodoCard';
import Sidebar from './Sidebar';
import UserDropdown from './UserDropdown';
import NewTaskForm from './NewTaskForm'; 
import './StickyNotes.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faPlus } from '@fortawesome/free-solid-svg-icons'; // Import the required icons
import TodoImg from '../images/Todoimg.png';;

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
        category: '', // New state for category
        deadline: '', // New state for deadline
        priority: '', // New state for priority
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
    const [sortOrder, setSortOrder] = useState('NONE'); // New state for sorting order
    const [deadline, setDeadline] = useState(''); // State for deadline
    const [priority, setPriority] = useState(''); 
    const [category, setCategory] = useState(''); // State for category
    const [showForm, setShowForm] = useState(false);


    
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

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    
    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    };
    
    const handlePriorityChange = (e) => {
        setPriority(e.target.value);
    };

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

    const handleAdd = (task) => {
        if (!task.description || !selectedUser || !task.category || !task.deadline || !task.priority) return;
        const newTask = {
            userid: selectedUser,
            description: task.description,
            category: task.category,
            deadline: task.deadline,
            priority: task.priority,
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

    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    const sortTasks = (tasks) => {
        if (sortOrder === 'PRIORITY_ASC') {
            return tasks.sort((a, b) => {
                const priorities = { 'Low': 1, 'Medium': 2, 'High': 3 };
                return priorities[a.priority] - priorities[b.priority];
            });
        } else if (sortOrder === 'PRIORITY_DESC') {
            return tasks.sort((a, b) => {
                const priorities = { 'Low': 1, 'Medium': 2, 'High': 3 };
                return priorities[b.priority] - priorities[a.priority];
            });
        }
        return tasks;
    };


    const filteredTasks = state.userTasks
        .filter(task => {
            if (filter === 'COMPLETED') {
                return task.completed;
            } else if (filter === 'PENDING') {
                return !task.completed;
            }
            return true;
        })
        .filter(task => {
            if (priorityFilter === 'ALL') {
                return true;
            }
            return task.priority === priorityFilter;
        })
        .filter(task => {
            if (!searchQuery) return true;
            return task.description.toLowerCase().includes(searchQuery.toLowerCase());
        });

        const sortedTasks = sortTasks(filteredTasks);

    return (
        <div className="d-flex">
            <Sidebar users={state.users} />

            <div className="container p-4">
              
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
    <img src={TodoImg} alt="To-Do List" className="mb-4" style={{ maxWidth: '30%', height: 'auto' }} />
</div>

     

                {/* <div className="mb-3">
                    <div className="input-group">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            className="form-control"
                            placeholder="Add a new task"
                        />
                        <button onClick={handleAdd} className="btn btn-primary">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                </div>
{/* Dropdown for selecting category */}
{/*<div className="mb-3">
                    <label htmlFor="category">Category:</label>
                    <select id="category" className="form-select" onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                </div>
                {/* Input for deadline */}
               {/*<div className="mb-3">
                    <label htmlFor="deadline">Deadline:</label>
                    <input type="date" id="deadline" className="form-control" onChange={handleDeadlineChange} />
                </div>
                {/* Dropdown for selecting priority */}
               {/* <div className="mb-3">
                    <label htmlFor="priority">Priority:</label>
                    <select id="priority" className="form-select" onChange={handlePriorityChange}>
                        <option value="">Select Priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                */}
                
   
                {editTask && (
                    <div className="mb-4">
                        <h3>Edit Task</h3>
                        <form className="row g-3" onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
                            <div className="col-md-6">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={editTask.description}
                                    onChange={handleEditChange}
                                    className="form-control"
                                    placeholder="Description"
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="category" className="form-label">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={editTask.category}
                                    onChange={handleEditChange}
                                    className="form-select"
                                >
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.name}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="deadline" className="form-label">Deadline</label>
                                <input
                                    type="date"
                                    id="deadline"
                                    name="deadline"
                                    value={editTask.deadline}
                                    onChange={handleEditChange}
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="priority" className="form-label">Priority</label>
                                <select
                                    id="priority"
                                    name="priority"
                                    value={editTask.priority}
                                    onChange={handleEditChange}
                                    className="form-select"
                                >
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="completed" className="form-label">Status</label>
                                <select
                                    id="completed"
                                    name="completed"
                                    value={editTask.completed}
                                    onChange={handleEditChange}
                                    className="form-select"
                                >
                                    <option value={false}>Pending</option>
                                    <option value={true}>Completed</option>
                                </select>
                            </div>
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className="mb-4">
                    <div className="row">
                        <div className="col-md-4 mb-2">
                        <i class="bi bi-person-circle"></i>
                            <h5>Select User </h5>
                            
                            <UserDropdown users={state.users} className="form-select" selectedUser={selectedUser} handleUserChange={handleUserChange}  />
                        </div>
                        <div className="col-md-4 mb-2">
                        <i class="bi bi-funnel-fill"></i>
                        <h5>Filter Status</h5>
                        
                            <select value={filter} onChange={handleFilterChange} className="form-select">
                                <option value="ALL">ALL</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="PENDING">Pending</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-2">
                        <i class="bi bi-funnel-fill"></i>
                        <h5>Filter Priority</h5>
                        
                            <select value={priorityFilter} onChange={handlePriorityFilterChange} className="form-select">
                                <option value="ALL">ALL</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <form className="example" onSubmit={(e) => { e.preventDefault(); }}>
                                <input 
                                    type="text" 
                                    value={searchQuery} 
                                    onChange={handleSearchChange} 
                                    placeholder="Search tasks" 
                                    name="search"
                                />
                                <button type="submit">
                                    <i className="fa fa-search"></i>
                                </button>
                            </form>
                        </div>
                        <div className="col-md-6 mb-2">
                       
                      
                            <select value={sortOrder} onChange={handleSortOrderChange} className="form-select">
                                <option value="NONE">Sort by Priority</option>
                                <option value="PRIORITY_ASC">Priority (Low to High)</option>
                                <option value="PRIORITY_DESC">Priority (High to Low)</option>
                            </select>
                        </div>
                    </div>
                </div>

                {!showForm ? (
                    <button onClick={() => setShowForm(true)} className="btn btn-primary mb-3">
                        <FontAwesomeIcon icon={faPlus} /> Add Task
                    </button>
                ) : null}

                {/* Conditionally render the form */}
                {showForm && (
                    <div className="mb-3">
                        <NewTaskForm categories={categories} handleAdd={handleAdd} />
                        <button onClick={() => setShowForm(false)} className="btn btn-secondary mt-3">
                            Cancel
                        </button>
                    </div>
                )}
                <div id="todo-cards">
                    {sortedTasks.map((task) => (
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
