import React from 'react';
import { Link } from 'react-router-dom';
import UserElements from './UserElements';

const NavBar = () => (
    <header>
        <Link to="/">
            <h1>Ticketing</h1>
        </Link>
        <UserElements />
    </header>
);

export default NavBar;
