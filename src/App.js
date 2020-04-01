import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import './App.scss';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import styled from 'styled-components';
import { useAuth0 } from './react-auth0-spa';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Profile from './components/Profile';

const {
    REACT_APP_APOLLO_URI,
    REACT_APP_HASURA_ADMIN_SECRET
} = process.env;

const createApolloClient = authToken => {
    return new ApolloClient({
        link: new HttpLink({
            uri: REACT_APP_APOLLO_URI,
            headers: {
                Authorization: `Bearer ${authToken}`,
                'x-hasura-admin-secret': REACT_APP_HASURA_ADMIN_SECRET
            }
        }),
        cache: new InMemoryCache()
    })
};

function App({ idToken }) {
    const { loading } = useAuth0();
    if (loading || !idToken) {
        return <div>Loading...</div>;
    }
    const client = createApolloClient(idToken);

    return (
        <ApolloProvider client={client}>
            <div className="App">
                <Router history={history}>
                    <NavBar />
                    <div className="page-wrap">
                        <Switch>
                            <Route path="/" component={Home} />
                            <Route path="/profile" component={Profile} />
                        </Switch>
                    </div>
                </Router>
            </div>
        </ApolloProvider>
    );
}

export default App;
