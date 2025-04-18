
import React from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/constant';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../hooks/AuthProvider';

export default function Header() {

    const auth = useAuth();

  return (
    
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
            <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <a href="index3.html" className="nav-link">Actualiser </a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">Profil</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <a href="#" className="nav-link">Paramètres</a>
            </li>
            <li className="nav-item d-none d-sm-inline-block">
                <a onClick={() => auth.logOut()} href="#" className="nav-link">Déconnexion</a>
            </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
        
        <li className="nav-item">
            <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
            <i className="fas fa-th-large"></i> &nbsp;
            Liste des indicateurs
            </a>
        </li>
        </ul>
    </nav>


  );
}