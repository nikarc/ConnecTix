import React from 'react';
import { useSelector } from 'react-redux';
import { selectTickets } from '../store/ticketsSlice';

const Cart = () => {
    const tickets = useSelector(selectTickets);

    return (
        <div id="Cart">
            {
                Object.keys(tickets).length ?
                    <ul className="floating-card">
                        {Object.keys(tickets).map((key, index) => (
                            <li key={index}>{tickets[key]}</li>
                        ))}
                    </ul>
                    : <p>Your cart is empty</p>
            }
        </div>
    )
};

export default Cart;
