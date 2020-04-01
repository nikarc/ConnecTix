import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import styled from 'styled-components';
import { styles } from '../utils/constants';

const NavBarWrapper = styled.div`
    background-color: ${styles.brand};
    padding: 10px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        ${styles.button}
    }
`;

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <NavBarWrapper>
            <h1>Ticketing</h1>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && <button onClick={() => logout()}>Log out</button>}
        </NavBarWrapper>
    );
};

export default NavBar;
