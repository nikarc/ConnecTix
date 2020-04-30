import React from 'react';
import { Link } from 'react-router-dom';
import UserElements from './UserElements';

const { REACT_APP_SITE_NAME: SITE_NAME } = process.env;

const NavBar = () => (
    <header>
        <Link to="/">
            <h1 id="BrandName">{SITE_NAME}</h1>
        </Link>
        <UserElements />
    </header>
);

export default NavBar;
