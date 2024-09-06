import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';
import Logo from '../images/SPARK.png';
import { useAuth } from '../auth/AuthContext';

const NavbarWithAuth = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // useState hook to manage the mobile menu state
  const [clicked, setClicked] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Function to toggle the mobile menu
  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="navbar">
      <nav>
        <Link to="/">
          <img id="brand" src={Logo} alt="logo" />
        </Link>
        <ul className={clicked ? "nav-menu" : "nav-menu active"}>
          <li><Link className="navtext" to="/">Home</Link></li>
          <li><Link className="navtext" to="/about">About Us</Link></li>
          <li>
            <Link className="navtext" to={isAuthenticated ? "/events" : "/event-calendar"}>
              {isAuthenticated ? "Events" : "Events"}
            </Link>
          </li>

          <li><Link className="navtext" to="/contact">Contact</Link></li>

          {isAuthenticated ? (
              <li>
                <button id="logout__btn" onClick={handleLogout} className="navtext">Sign Out</button>
              </li>
            ) : (
              <li>
                <Link id="login__btn" className="navtext" to="/login">Log in</Link>
              </li>
            )}
        </ul>
        <div className="mobile-navbar" onClick={handleClick}>
          <i id='bar' className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    </div>
  );
};

export default NavbarWithAuth;
