import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { useAuth0 } from "./react-auth0-spa";
import './App.css';

import NavBar from './components/NavBar';

function App() {
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <header>
                <NavBar />
            </header>
        </div>
    );
}

export default App;
