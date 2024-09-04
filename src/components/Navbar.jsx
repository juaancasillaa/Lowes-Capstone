import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import Logo from '../images/SPARK.png';


class NavBar extends Component {

  state = { clicked: false };
  handleClick = () => {
    this.setState({clicked: !this.state.clicked})
  }

  render() {
  return (
    <div className="navbar">
      <nav>
        <Link    to="/"><img id="brand" src={Logo} alt="logo" /></Link>

          <ul className={ this.state.clicked ? "nav-menu" : "nav-menu active" }>
          <li><Link className='navtext' to="/">Home</Link></li>
          <li><Link className='navtext' to="/about">About Us</Link></li>
          <li><Link className='navtext' to="/events">Event</Link></li>
          <li><Link className='navtext' to="/contact">Contact</Link></li>
          <li><Link id='Loging__btn' to="/login">Log in</Link></li>
        </ul>
      <div className="mobile-navbar" onClick={this.handleClick}>
      <i id='bar' className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
    </div>
    </nav>
    </div>

  );
}
}

export default NavBar;




////


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../css/Navbar.css';
// import Logo from '../images/SPARK.png';

// const Navbar = () => {
//   const [showMenu, setShowMenu] = useState(false);
//   const [showSideMenu, setShowSideMenu] = useState(false);

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const toggleSideMenu = () => {
//     setShowSideMenu(!showSideMenu);
//   };

//   return (
//     <nav>
//       <div id='text' className="container">
//         <a href="#" id="brand" onClick={() => setShowSideMenu(false)}><img src={Logo} alt="logo" /></a>
//         <div className="hamburger-menu" onClick={toggleSideMenu}>
//           <div className="bar"></div>
//           <div className="bar"></div>
//           <div className="bar"></div>
//         </div>
//         <ul className={`navbar-menu ${showMenu ? 'show' : ''}`}>
//           <li><Link className='navtext' to="/">Home</Link></li>
//           <li><Link className='navtext' to="/about">About us</Link></li>
//           <li><Link className='navtext' to="/events">Event</Link></li>
//           <li><Link className='navtext' to="/contact">Contact</Link></li>
//           <li><Link id='Loging__btn' to="/login">Log in</Link></li>
//         </ul>
//         <div className={`side-menu ${showSideMenu ? 'show' : ''}`}>
//           <ul>
//             <li><Link to="/">Home</Link></li>
//             <li><Link to="/about">About us</Link></li>
//             <li><Link to="/events">Event</Link></li>
//             <li><Link to="/contact">Contact</Link></li>
//             <li><Link to="/login">Log in</Link></li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;