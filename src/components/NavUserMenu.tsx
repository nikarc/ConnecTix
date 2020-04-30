import React from 'react';
import { useAuth0 } from '../react-auth0-spa';

export default function NavUserMenu () {
    const { logout } = useAuth0();

    return (
        <div className="nav-user-menu">
            <ul>
                <li>
                    <button className="btn btn-transparent" onClick={() => logout()}>Log out</button>
                </li>
            </ul>
        </div>
    )
}
