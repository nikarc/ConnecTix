import React from 'react';
import { useAuth0 } from '../react-auth0-spa';

export default function NavUserMenu () {
    const { user, logout } = useAuth0();

    return (
        <div className="card nav-user-menu">
            <ul>
                <li>
                    <button className="btn btn-transparent" onClick={() => logout()}>Log out</button>
                </li>
            </ul>
        </div>
    )
}
