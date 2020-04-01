import React from 'react';
import UserElements from './UserElements';

class NavBar extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <header>
                <h1>Ticketing</h1>
                <UserElements />
            </header>
        );
    }
};

export default NavBar;
