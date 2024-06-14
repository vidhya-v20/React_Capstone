import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import '../App.css';
import logo from '../images/logo1.png'; //logo
import loginpic from '../images/loginpic.svg'; 

const Register = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  const checkPage = async () => {
    const json = await getUser(userName);
    if (json.available) {
      setAvailabilityMessage("User Name Available");
      if (doesPasswordsMatch()) {
        setPasswordMatchMessage("");
        addUser();
      } else {
        setPasswordMatchMessage("Password and Confirm Password do not match");
      }
    } else {
      setAvailabilityMessage("User Name already in use, please use a different one");
    }
  };

  const getUser = async (userId) => {
    return fetch(`http://localhost:8083/api/username_available/${userId}`)
      .then(response => response.json())
      .then(responseJson => responseJson);
  };

  const doesPasswordsMatch = () => {
    return password === confirmPassword;
  };

  const addUser = () => {
    const userBody = {
      id: "",
      name,
      username: userName,
      password,
    };
    fetch("http://localhost:8083/api/users", {
      method: "POST",
      body: JSON.stringify(userBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(response => response.json())
      .then(() => {
        setSnackbarMessage("User added successfully please login to proceed further");
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    navigate("/login");
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar1 w-100">
        <nav className="navbar navbar-expand-lg navbar-light w-100">
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
                <a className="nav-link" href="/login">Back</a>
              </li>
            </ul>
          </div>
        </nav>
      </nav>
      <section className="d-flex flex-column justify-content-center align-items-center flex-grow-1">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="mt-5">
                <img src={loginpic} alt="Organize" className="img-fluid" />
              </div>
            </div>
            <div className="col-md-6">
              <br></br>
              <br></br>
              <div className="col-md-10 mx-auto rounded shadow bg-white">
                <div className="row">
                  <div className="col-md-12">
                    <div className="m-5 text-center">
                      <form className="m-5" onSubmit={(e) => { e.preventDefault(); checkPage(); }}>
                        <h2 style={{ textAlign: 'left' }}>Register User</h2>
                        <div className="form-group row">
                          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                          <div className="col-sm-11">
                            <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="userName" className="col-sm-2 col-form-label">Username</label>
                          <div className="col-sm-11">
                            <input type="text" id="userName" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />
                          </div>
                        </div>
                        <div id="availabilityDiv">{availabilityMessage}</div>
                        <div className="form-group row">
                          <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                          <div className="col-sm-11">
                            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                          <div className="col-sm-11">
                            <input type="password" id="confirmPassword" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                          </div>
                        </div>
                        <div id="passwordmatchDiv">{passwordMatchMessage}</div>
                        <br></br>
                        
                        <button type="submit" className="form-control btn btn-dark btn-lg w-100">Add User</button>
                      </form>
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="w-100 text-center mt-auto">
        <p>Author: Vidhya V<br />
          <a href="mailto:vidhya-v@pluralsight.com">vidhya-v@pluralsight.com</a>
        </p>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p className="text-center"> &copy; 2024 - All rights reserved </p>
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

export default Register;
