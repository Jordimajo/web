import React from 'react';
import './Header.css';
import Sidebar from './Sidebar';
import { faChartBar, faCalendarAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import Instagram from '@mui/icons-material/Instagram';
import Facebook from '@mui/icons-material/Facebook';

const Header = () => {
    return (
        <div className="header-container">
            <div className="title-container">
                <Sidebar />

                <Link to="/calendario" className="icon-link">
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </Link>

                <Link to="/tutorial" className="icon-link">
                    <FontAwesomeIcon icon={faQuestionCircle} />
                </Link>

                <Link to="/" className="title-link">
                    <div className="titles">
                        <img src="/preciosisimo.png" alt="Logo Preciosisimo" className="logo-image" />
                    </div>
                </Link>


                <Link to="/stats" className="icon-link">
                    <FontAwesomeIcon icon={faChartBar} />
                </Link>

                <a href="https://www.instagram.com/preciosisimo.es/" className="icon-link">
                    <Instagram />
                </a>

                <a href="https://www.facebook.com/people/Preciosisimocom/61551617953313/" className="icon-link">
                    <Facebook />
                </a>
            </div>
        </div>
    );
};

export default Header;

