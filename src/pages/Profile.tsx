// src/components/Profile.js

import React from "react";
import { Redirect } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-spa";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import UserOrderCard from '../components/UserOrderCard';
import Loading from '../components/Loading';

import { User } from '../interfaces/user';
import { Order } from '../interfaces/order';

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

interface ProfileProps {
    user: User
    logout: () => any
}

const Profile: React.FC<ProfileProps> = ({ user, logout }) => {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { userEmail: user.email },
    });

    if (error) return <div>{JSON.stringify(error, null, 2)}</div>;

    const gqlUser = data && data.users && data.users[0];

    return (
        <div id="Profile" className="page-wrap">
            <div className="page-container">
                {loading && <Loading height={200} />}
                {!loading && gqlUser &&
                    (<>
                        <img className="user-image" src={user.picture} alt="Profile" />

                        <h2>{user.name}</h2>
                        <button className="link" onClick={logout}>logout</button>
                        <div className="user-orders">
                            {gqlUser.orders.map((order: Order, key: number) => (
                                <UserOrderCard order={order} key={key} />
                            ))}
                        </div>
                    </>)
                }
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
