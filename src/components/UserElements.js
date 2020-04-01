import React, { Fragment } from 'react';
import { useAuth0 } from '../react-auth0-spa';
import styled from 'styled-components';

const UserElementsWrap = styled.div`
    display: flex;
    align-items: center;
`;

const UserAvatar = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 100%;
`;

const UserSignedIn = ({ avatar, logout }) => (
    <Fragment>
        <UserAvatar src={avatar} alt="" />
        <button className="btn btn-transparent" onClick={() => logout()}>Log out</button>
    </Fragment>
);

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
