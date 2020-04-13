// src/components/Profile.js

import React from "react";
import { Redirect } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import UserOrderCard from '../components/UserOrderCard';

const GET_USER = gql`
    query getUsers($userEmail: String!) {
        users(where: { email: { _eq: $userEmail }}) {
            id
            orders {
                id
                order_status {
                    type
                }
                total
                confirmation
                tickets {
                    id
                    price
                }
            }
        }
    }
`;

const Profile = ({ user, logout }) => {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { userEmail: user.email },
    });

    if (error) return <div>{JSON.stringify(error, null, 2)}</div>;
    if (loading) return <div>Loading...</div>;

    const [ gqlUser ] = data.users;

    return (
        <div id="Profile">
            <div className="page-wrap">
                <img className="user-image" src={user.picture} alt="Profile" />

                <h2>{user.name}</h2>
                <button className="link" onClick={logout}>logout</button>
                <div className="user-orders">
                    {gqlUser.orders.map((order, key) => (
                        <UserOrderCard order={order} key={key} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const ShowOrRedirectProfile = () => {
    const { user, logout } = useAuth0();

    if (!user) {
        return <Redirect to="/" />;
    }

    return <Profile user={user} logout={logout} />;
}

export default ShowOrRedirectProfile;
