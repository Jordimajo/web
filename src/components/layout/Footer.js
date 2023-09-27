import React from 'react';
import {  Instagram, Facebook } from '@mui/icons-material'; // Si estás usando MUI
import './Footer.css';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-section">
      <p className="footer-text">Legal</p>
        <a href="/legal" className="footer-link">Aviso legal</a>
        <a href="/cookies" className="footer-link">Política de cookies</a>
      </div>

      <div className="footer-section">
        <p className="footer-text">Síguenos</p>
        <div className="footer-icons">
          <a href="https://www.instagram.com/preciosisimo_com/" className="icon-link"><Instagram /></a>
          <a href="https://www.facebook.com/people/Preciosisimocom/61551617953313/" className="icon-link"><Facebook /></a>
        </div>
      </div>

      <div className="footer-section">
        <p className="footer-text">Contacto</p>
        <a href="mailto:info@preciosisimo.com" className="footer-link">info@preciosisimo.com</a>
      </div>
    </div>
  );
}

export default Footer;

