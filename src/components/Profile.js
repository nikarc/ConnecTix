// src/components/Profile.js

import React from "react";
import { Redirect } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import styled from 'styled-components';
import history from '../utils/history';

const Wrapper = styled.div`
    padding: 50px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const UserImg = styled.img`
    width: 200px;
    height: 200px;
    border-radius: 100%;
    border: 10px solid rgba(168, 165, 165, 0.5);
`;

const Profile = () => {
    const { user, logout } = useAuth0();

    if (!user) {
        return <Redirect to="/" />;
    }

    return (
        <Wrapper>
            <UserImg src={user.picture} alt="Profile" />

            <h2>{user.name}</h2>
            <button className="link" onClick={logout}>logout</button>
        </Wrapper>
    );
};

export default Profile;
