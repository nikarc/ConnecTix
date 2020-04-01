import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './utils/history';
import './App.scss';

import NavBar from './components/NavBar';
import Profile from './components/Profile';

function App() {
    return (
        <div className="App">
            <Router history={history}>
                <NavBar />
                <Switch>
                    <Route path="/" exact />
                    <Route path="/profile" component={Profile} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
