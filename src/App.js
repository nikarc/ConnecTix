import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import './App.scss';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { useAuth0 } from './react-auth0-spa';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Profile from './components/Profile';
import Event from './components/Event';
import Cart from './components/Cart';

const {
    REACT_APP_APOLLO_URI,
    REACT_APP_HASURA_ADMIN_SECRET,
    REACT_APP_STRIPE_PK
} = process.env;

const stripePromise = loadStripe(REACT_APP_STRIPE_PK);

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
            <Elements stripe={stripePromise}>
                <div className="App">
                    <Router history={history}>
                        <NavBar />
                        <div className="page-wrap">
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <Route path="/profile" component={Profile} />
                                <Route exact path="/events/:eventId" render={props => <Event {...props} idToken={idToken} />} />
                                <Route path="/cart" component={Cart} />
                            </Switch>
                        </div>
                    </Router>
                </div>
            </Elements>
        </ApolloProvider>
    );
}

export default App;
