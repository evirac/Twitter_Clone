import React from 'react';
import { Link } from 'react-router-dom';
import Image from "react-bootstrap/Image";
import '../sass/Auth.scss';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-cover">
          <Image src="assets/logo.svg" className="auth-logo" />
          <h2>Welcome back</h2>
        </div>
        <div className="auth-form">
          <form>
            <input type="text" placeholder="Username" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="auth-button">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
