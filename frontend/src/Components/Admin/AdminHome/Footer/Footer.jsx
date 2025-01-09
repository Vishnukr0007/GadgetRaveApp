import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div className="footer-sec">
      <div className="footer-content">
        <p className="footer-text">© 2024 Your Company. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="/about" className="footer-link">About</a>
          <a href="/contact" className="footer-link">Contact</a>
          <a href="/privacy" className="footer-link">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
