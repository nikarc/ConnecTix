import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectOrder } from '../store/orderSlice';
import { useAuth0 } from '../react-auth0-spa';

import NavUserMenu from './NavUserMenu';

interface UserSignedInProps {
    avatar: string
}

const UserSignedIn: React.FC<UserSignedInProps> = ({ avatar }) => {
    const { order } = useSelector(selectOrder);
    const ticketCount = order && order.events && Object.keys(order.events).reduce((accumulator, key) => accumulator + order.events[key].available_tickets.length, 0);

    return (
        <Fragment>
            <div className="avatar-wrap">
                <Link to="/profile">
                    <img className="user-avatar" src={avatar} alt="" />
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
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    
    return (
        <div className="user-elements-wrap">
            {!isAuthenticated && (
                <button className="btn" onClick={() => loginWithRedirect()}>Log in</button>
            )}

            {isAuthenticated && user && <UserSignedIn avatar={user.picture} />}
        </div>
    );
}
