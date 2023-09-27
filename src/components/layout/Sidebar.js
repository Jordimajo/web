import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const handleMenuLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="sidebar-container">
      <FontAwesomeIcon icon={faBars} onClick={() => setIsOpen(!isOpen)} ref={iconRef} />
      {isOpen && (
        <div className="menu" ref={menuRef}>
          <ul>
            <Link to="/" onClick={handleMenuLinkClick}><li>Reto del día</li></Link>
            <Link to="/calendario" onClick={handleMenuLinkClick}><li>Retos anteriores</li></Link>
            <Link to="/stats" onClick={handleMenuLinkClick}><li>Estadísticas</li></Link>
            <Link to="/tutorial" onClick={handleMenuLinkClick}><li>Cómo jugar?</li></Link>
            <Link to="/contacto" onClick={handleMenuLinkClick}><li>Contacto</li></Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;


