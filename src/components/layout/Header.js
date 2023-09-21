import React from 'react';
import './Header.css';
import Sidebar from './Sidebar';
import { faChartBar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="header-container">
            <div className="title-container">
                <Sidebar />

                <Link to="/calendario" className="icon-link">
                    <FontAwesomeIcon icon={faCalendarAlt} className="left-icon" />
                </Link>

                <Link to="/" className="title-link">
                    <div className="titles">
                        <h1>ADIVINA EL PRECIO</h1>
                        <h2>5 productos nuevos cada día</h2>
                    </div>
                </Link>

                <Link to="/stats" className="icon-link">
                    <FontAwesomeIcon icon={faChartBar} className="right-icon" />
                </Link>
            </div>
        </div>
    );
};

export default Header;
