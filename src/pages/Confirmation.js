import React from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Confirmation () {
    let query = useQuery();
    const order = query.get('order');

    return (
        <div className="page-container">
            <h1>Success! Order complete</h1>
        </div>
    );
};
