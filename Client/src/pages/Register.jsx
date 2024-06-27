import React from 'react';
import { Link } from 'react-router-dom';
import Image from "react-bootstrap/Image";
import '../sass/Auth.scss';

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-cover">
          <Image src="assets/logo_white.svg" className="auth-logo" />
          <h2>Join us</h2>
        </div>
        <div className="auth-form">
          <form>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="auth-button">Register</button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
