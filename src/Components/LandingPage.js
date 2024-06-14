import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../App.css';
import img1 from '../images/img2.webp'; // First image
import img2 from '../images/img3.webp'; // Second image
import logo from '../images/logo1.png'; //logo
import contactImg from '../images/contact2.jpeg'; // Image for contact section
import 'bootstrap/dist/css/bootstrap.min.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></link>
const LandingPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSendMessage = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <nav className="navbar1">
        <nav className="navbar navbar-expand-lg navbar-light">
          <a className="navbar-brand" href="#">
          <img src={logo} alt="Organize" className="img-fluid" width="100" height="60" />
           
            Stay Organized
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <HashLink className="nav-link" to="#features">FEATURES</HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" to="#about">ABOUT</HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" to="#contact">CONTACT</HashLink>
              </li>
            </ul>
          </div>
        </nav>
      </nav>

      <div className="bg-image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="welcome-container">
                <h1 className="welcome-text">Welcome To Stay Organized</h1>
                <p>People are finding it harder and harder to remember and manage daily tasks in this fast-paced world. This to-do list app helps users to create and manage their daily tasks more easily.</p>
                <Link to="/login" className="btn btn-primary btn-lg get-started-btn">Get Started</Link>
              </div>
            </div>
            <div className="col-md-6">
              <img src={img1} alt="Organize" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>

      <div id="features" className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src={img2} alt="Go Beyond" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <h2>FEATURES</h2>
            <p>Go beyond checking off daily tasks on your to-do list</p>
            <ul className="feature-list">
              <li>Organize your work with to-do list</li>
              <li>Add details to every task based on categories.</li>
              <li>Allows the user to view and Edit todo details.</li>
              <li>Register new user for our services.</li>
              <li>Search functionality available to displayed tasks in real-time based on the keywords entered, matching against task descriptions.</li>
              <li>Ability to filter tasks by their categories.</li>
              <li>Sorting feature that lets users organize their tasks based on priority levels.</li>
              <li>Filter tasks based on their completion status this will enable users to easily track pending tasks and mark them as completed when done.</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="about" className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-left">About Us</h2>
            <p className="text-left">This application is designed to help you stay organized and manage your tasks efficiently. With our user-friendly interface, you can easily keep track of your daily tasks and ensure that nothing is forgotten.</p>
          </div>
        </div>
      </div>

      <div id="contact" className="container mt-5">
        <div className="text-center">
          <h3>Contact us</h3>
          <h4 className="text-muted">We would love to hear from you!</h4>
        </div>

        <div className="row mt-3 justify-content-center">
          <div className="col-md-6">
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Your Name *" aria-label="name" />
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Your Email *" aria-label="email" />
            </div>
            <div className="mb-2">
              <input type="text" className="form-control" placeholder="Your Phone Number *" aria-label="phone" />
            </div>
            <div className="mb-2">
              <textarea className="form-control" placeholder="Your Message *" rows="5"></textarea>
            </div>
            <div className="mb-2 text-center">
              <button type="button" className="btn btn-dark" onClick={handleSendMessage}>Send Message</button>
            </div>
          </div>
          <div className="col-md-6 text-center">
            <img src={contactImg} alt="Contact Us" className="img-fluid" />
          </div>
        </div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            We successfully received your message. We will get in touch soon!
          </Alert>
        </Snackbar>
      </div>

      <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-12">
        <p className="text-center"> &copy; 2024 - All rights reserved </p>
        <p className="text-center">Author: Vidhya V | <a href="mailto:vidhya-v@pluralsight.com">vidhya-v@pluralsight.com</a></p>
        <div className="text-center">
          <a href="https://www.instagram.com/your_instagram" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a> 
          <a href="https://www.facebook.com/your_facebook" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
          <a href="https://twitter.com/your_twitter" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
  </div>
</footer>
</div>
  );
};


 

export default LandingPage;
