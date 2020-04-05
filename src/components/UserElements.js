import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTickets } from '../store/ticketsSlice';
import { useAuth0 } from '../react-auth0-spa';
import styled from 'styled-components';

import NavUserMenu from './NavUserMenu';

const UserElementsWrap = styled.div`
    display: flex;
    align-items: stretch;
`;

const UserAvatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 100%;
`;

const UserSignedIn = ({ avatar, logout }) => {
    const tickets = useSelector(selectTickets);
    const ticketCount = tickets && Object.keys(tickets).reduce((accumulator, key) => accumulator + tickets[key], 0);

    return (
        <Fragment>
            <div className="avatar-wrap">
                <UserAvatar src={avatar} alt="" />
                <NavUserMenu />
            </div>
            <Link to="/cart">
                <button className="btn">
                    Cart
                    {ticketCount > 0 ? <span>({ticketCount})</span> : ''}
                </button>
            </Link>
        </Fragment>
    );
};

export default function UserElements () {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
    
    return (
        <UserElementsWrap className="user-elements">
            {!isAuthenticated && (
                <button className="btn" onClick={() => loginWithRedirect({})}>Log in</button>
            )}

            {isAuthenticated && user && <UserSignedIn avatar={user.picture} logout={logout} />}
        </UserElementsWrap>
    );
}
