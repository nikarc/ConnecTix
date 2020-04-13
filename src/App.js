import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import './App.scss';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Event from './pages/Event';
import Cart from './pages/Cart';
import Confirmation from './pages/Confirmation';

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

function App({ idToken, context }) {
    const client = createApolloClient(idToken);

    return (
        <ApolloProvider client={client}>
            <Elements stripe={stripePromise}>
                <div className={'App'}>
                    <Router history={history}>
                        <NavBar />
                        <Switch>
                            <Route exact path="/" render={() => <Home />} />
                            <Route path="/profile" render={() => <Profile />} />
                            <Route exact path="/events/:eventId" render={props => <Event {...props} idToken={idToken} />} />
                            <Route path="/confirmation" render={() => <Confirmation />} />
                            <Route path="/cart" render={() => <Cart />} />
                        </Switch>
                    </Router>
                </div>
            </Elements>
        </ApolloProvider>
    );
}

export default App;
