import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import helloImage from '../images/hello1.jpeg'; // Adjust the path as needed

const Sidebar = () => {
  const [categories, setCategories] = useState([]);
  const [counts, setCounts] = useState({
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
  });

  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchCategories();
    fetchTodos();
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/todos');
      const data = await response.json();
      calculateCounts(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
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

    setCounts(counts);
  };

  const getCategoryCount = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'personal task':
        return counts.personal ;
      case 'household task':
        return counts.household;
      case 'financial task':
        return counts.financial;
      case 'work task':
        return counts.work;
      case 'errand':
        return counts.errand;
      case 'help others':
        return counts.help;
      default:
        return 0;
    }
  };

  const getCategoryCountColor = (count) => {
    if (count === 0) {
      return '#28a745'; // Grey color for zero count
    } else if (count < 5) {
      return '#ff5733'; // Orange color for counts less than 5
    } else if (count < 10) {
      return '#ffc300'; // Yellow color for counts between 5 and 10
    } else {
      return '#d1d1d1'; // Green color for counts greater than or equal to 10
    }
  };

  return (
    <div className="sidenav">
      <div className="d-flex">
        
        <div className="sidebar-logo">
          <img src={helloImage} alt="Hello" width="249" height="120" />
        </div>
      </div>
      <ul className="sidebar-nav">
        <li className="sidebar-item">
          <Link to="/dashboard/new-todo" className="sidebar-link">
            <i className="lni bi-plus-circle-fill"></i>
            <span>Create New Task</span>
          </Link>
          <Link to="/dashboard/user-todos" className="sidebar-link">
            <i className="lni bi-binoculars-fill"></i>
            <span>View All User Tasks</span>
          </Link>
        </li>
      </ul>
      <hr />
      <div className="todo-aside-categories-list">
        <ul className="todo-aside-list" id="todo-allCategory">
          <li className="todo-aside-sublist"> <b>Total Tasks</b> &nbsp;&nbsp;
            <span>
              <span id="todo-alltask-count" className="badge text-bg-primary todo_countBadge">{counts.total}</span>
            </span>
          </li>
          <br />
          
          <span className="todo-aside-list-title">
            <b>Categories</b>
          </span>
          {categories.map((category) => (
            <li key={category.id} className="todo-aside-sublist">
              {category.name} &nbsp;&nbsp;
              <span>
                <span className="badge text-bg-primary todo_countBadge" style={{ backgroundColor: getCategoryCountColor(getCategoryCount(category.name)) }}>
                  {getCategoryCount(category.name)}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div id="category_listerror"></div>
      </div>
      <hr />
      <div className="todo-aside-status-list">
        <span className="todo-aside-list-title"> <b>Status</b></span>
        <ul className="todo-aside-list">
          <li className="todo-aside-sublist">
            <i className="bi bi-patch-check-fill text-success" id="completedIcon"></i>&nbsp;Finished&nbsp;&nbsp;
            <span>
              <span id="todo-completed-count" className="badge text-bg-primary todo_countBadge">{counts.completed}</span>
            </span>
          </li>
          <li className="todo-aside-sublist">
            <i className="bi bi-shield-fill-exclamation text-danger"></i>&nbsp;Pending&nbsp;&nbsp;
            <span>
              <span id="todo-pending-count" className="badge text-bg-primary todo_countBadge">{counts.pending}</span>
            </span>
          </li>
        </ul>
      </div>
      <hr />
      <div className="todo-aside-priority-list">
        <span className="todo-aside-list-title"> <b>Priority</b></span>
        <ul className="todo-aside-list">
          <li className="todo-aside-sublist">
            <i className="bi bi-thermometer-high text-danger"></i>&nbsp;High&nbsp;&nbsp;
            <span>
            <span id="todo-high-count" className="badge text-bg-primary todo_countBadge">{counts.high}</span>
            </span>
          </li>
          <li className="todo-aside-sublist">
            <i className="bi bi-thermometer-half text-warning"></i>&nbsp;Medium&nbsp;&nbsp;
            <span>
              <span id="todo-medium-count" className="badge text-bg-primary todo_countBadge">{counts.medium}</span>
            </span>
          </li>
          <li className="todo-aside-sublist">
            <i className="bi bi-thermometer-low text-info"></i>&nbsp;Low&nbsp;&nbsp;
            <span>
              <span id="todo-low-count" className="badge text-bg-primary todo_countBadge">{counts.low}</span>
            </span>
          </li>
        </ul>
      </div>
      <div className="todo-aside-logout">
        <Link to="/" className="todo-aside-logout-btn">
          <i className="bi bi-box-arrow-right"></i>&nbsp;<b>Logout</b>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
