import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Logo from '../images/SPARK.png';
import '../css/LoginPage.css';
import { useAuth } from '../auth/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    if (!email || !validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      validationErrors.password = 'Password is required.';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          login(); // Update authentication context
          navigate('/events');
        } else {
          const errorData = await response.json();
          setErrors({ general: errorData.error });
        }
      } catch (error) {
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='login-page'>
      <div className='login-left'>
        <div className='login-help'>
          <h3>How to Log In:</h3>
          <p>1. Enter your registered email address and password in the fields provided.</p>
          <p>2. Click the "Login" button to access the admin portal.</p>
          <p>3. If you forget your password, check out the Need Help section below.</p>
  
          <h3>Need Help?</h3>
          <p>If you encounter any issues logging in or need further assistance, please contact our support team at support@sparkcommunity.org or call 1-800-555-SPARK.</p>
        </div>
      </div>
      <div className='login-right'>
        <div className="login-form">
          <img src={Logo} alt="spark-logo" />
          <h5>For administrator use only</h5>
          <form onSubmit={handleSubmit}>
            <div className="login-form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="login-form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit" className='login-button'>Login</button>
            {errors.general && <p className="error">{errors.general}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
