import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import logo from '../images/logo1.png'; //logo
import loginpic1 from '../images/loginpic1.svg'; 
import '../App.css';

const Login = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8083/api/users")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    navigate(`/dashboard`);
  };

  const validateForm = (event) => {
    event.preventDefault();
    const selectedUserName = users.find(user => user.id === selectedUserId)?.name;

    if (selectedUserId) {
      setSnackbarMessage(`Login successful! Welcome !!`);
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Please select a user.");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <nav className="navbar1 w-100">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Organize" className="img-fluid" width="100" height="60" />
            Stay Organized
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Register</a>
              </li>
            </ul>
          </div>
        </nav>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="mt-5">
              <img src={loginpic1} alt="Organize" className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <br></br>
            <div className="col-md-10 mx-auto rounded shadow bg-white">
              <div className="row">
                <div className="col-md-12">
                  <div className="m-5 text-center">
                    <form className="m-5" onSubmit={validateForm}>
                      <h2 style={{ textAlign: 'left' }}>Login</h2>
                      <div className="mb-3">
                        <label htmlFor="userSelect" className="form-label">User</label>
                        <select
                          id="userSelect"
                          className="form-control"
                          value={selectedUserId}
                          onChange={(e) => setSelectedUserId(e.target.value)}
                        >
                          <option value="">Select a user</option>
                          {users.map(user => (
                            <option key={user.id} value={user.id}>
                              {user.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input
                          className="form-control"
                          type="password"
                          id="loginPassword"
                          name="loginPassword"
                          defaultValue="dummyPassword"
                        />
                      </div>
                      <button type="submit" className="btn btn-dark w-100">Login</button>
                    </form>
                    <p>Don't have an account ? Please Register below </p>
                    <Link to="/register" className="btn btn-light w-60 mt-2"><b>Register</b></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-100 text-center mt-auto">
        <p>Author: Vidhya V<br />
          <a href="mailto:vidhya-v@pluralsight.com">vidhya-v@pluralsight.com</a>
        </p>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p className="text-center"> &copy; 2024 - All rights reserved </p>
                <div className="text-center">
          <a href="https://www.instagram.com/your_instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a> 
          <a href="https://www.facebook.com/your_facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
          <a href="https://twitter.com/your_twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Snackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          action={
            <Button color="inherit" size="small" onClick={handleSnackbarClose}>
              Ok
            </Button>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
