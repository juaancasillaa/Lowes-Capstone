import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import Logo from '../image/SPARK.png';

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleMenuToggle = () => {
    const navbarMenu = document.querySelector('.navbar-menu');
    navbarMenu.classList.toggle('active');
  };

  return (
    <nav className={visible ? '' : 'scrollUp'}>
      <div id='text' className="container">
        <a href="#" id="brand"><img src={Logo} alt="logo"/></a>
        <button onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/events">Event</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link id='Loging__btn' to="/login">Log in</Link></li>
          {/* <li><Link to="/">Sign up</Link></li> */}


        </ul>
      </div>
    </nav>
  );
};

export default Navbar;