import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';

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
      <div className="container">
        <a href="#" id="brand">Brand</a>
        <button onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="navbar-menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">Page A</a></li>
          <li><a href="#">Page B</a></li>
          <li><a href="#">Page C</a></li>
          <li><a href="#">Page D</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;



// import React from "react";
// import { Link } from "react-router-dom";
// import "../css/Navbar.css";

// function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/">Volunteer Tracking System</Link>
//       </div>
//       <ul className="navbar-links">
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//         <li>
//           <Link to="/events">Events</Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//         <li>
//           <Link to="/signup">Sign Up</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
