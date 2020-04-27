import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrder } from '../store/orderSlice';
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
    const { order } = useSelector(selectOrder);
    const ticketCount = order && order.events && Object.keys(order.events).reduce((accumulator, key) => accumulator + order.events[key].available_tickets.length, 0);

    return (
        <Fragment>
            <div className="avatar-wrap">
                <Link to="/profile">
                    <UserAvatar src={avatar} alt="" />
                </Link>
                <NavUserMenu />
            </div>
            <Link to="/cart">
                <button className="btn">
                    Cart &nbsp;
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
                <button className="btn" onClick={() => loginWithRedirect()}>Log in</button>
            )}

            {isAuthenticated && user && <UserSignedIn avatar={user.picture} logout={logout} />}
        </UserElementsWrap>
    );
}
