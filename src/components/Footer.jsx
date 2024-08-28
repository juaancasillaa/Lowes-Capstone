// src/components/Footer.jsx

import "../css/Footer.css";
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">Something</h1>
        
        <h2>Contact</h2>
        
        <address>
          5534 Somewhere In. The World 22193-10212<br />
          
          <a className="footer__btn" href="mailto:example@gmail.com">Email Us</a>
        </address>
      </div>
      

     
      <ul className="footer__nav">
        
        <li className="nav__item nav__item--extra">
          <h2 className="nav__title">Technology</h2>
          
          <ul className="nav__ul nav__ul--extra">
            <li>
              <a href="#">Hardware Design</a>
            </li>
            
            <li>
              <a href="#">Software Design</a>
            </li>
            
            <li>
              <a href="#">Digital Signage</a>
            </li>
               
          </ul>
        </li>
        
        <li className="nav__item">
          <h2 className="nav__title">Legal</h2>
          
          <ul className="nav__ul">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            
            <li>
              <a href="#">Terms of Use</a>
            </li>
            
            <li>
              <a href="#">Sitemap</a>
            </li>
          </ul>
        </li>

        <li className="nav__item">
          <h2 className="nav__title">Media</h2>

          <ul className="nav__ul icons">
            <li>
            <Link to="#"><FontAwesomeIcon icon={faFacebookF} /></Link>
            </li>

            <li>
            <Link to="#"><FontAwesomeIcon icon={faTwitter} /></Link>
            </li>
                
            <li>
            <Link to="#"><FontAwesomeIcon icon={faInstagram} /></Link>
            </li>
          </ul>
        </li>
      </ul>
      
      <div className="legal">
        <p>&copy; 2019 Something. All rights reserved.</p>
        
       
      </div>
    </footer>
  );
};

export default Footer;