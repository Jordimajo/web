import React from 'react';
import { Mail, Instagram, Facebook } from '@mui/icons-material'; // Si estás usando MUI
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
          <a href="#" className="icon-link"><Instagram /></a>
          <a href="#" className="icon-link"><Facebook /></a>
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

