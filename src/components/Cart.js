import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTickets } from '../store/ticketsSlice';

import CartEventCard from './CartEventCard';

const formattedOrderTotal = orderTotal => (orderTotal / 100).toFixed(2);

const Cart = () => {
    const events = useSelector(selectTickets);

    const [orderTotal] = useState(Object.keys(events).reduce((acc, e) => acc + events[e].tickets.reduce((_acc, t) => _acc + t.price, 0), 0));

    return (
        <div id="Cart" className="columns">
            <div className="cart-details column is-two-thirds">
                <CartEventCard events={events} />
            </div>
            <div className="cart-summary column is-one-third">
                <div className="floating-card">
                    <div className="card-header">
                        <span>Cart Summary</span>
                    </div>
                    <div className="card-body">
                        <p>
                            <span>Subtotal: </span>
                            <span className="order-subtotal">${formattedOrderTotal(orderTotal)}</span>
                        </p>
                        <p>
                            <span>Taxes: </span>
                            <span className="taxesTotal">${formattedOrderTotal(orderTotal * 0.3)}</span>
                        </p>
                        <div className="hr"></div>
                        <p className="order-total">
                            <span>Total: </span>
                            <span>${formattedOrderTotal(orderTotal + (orderTotal * 0.3))}</span>
                        </p>
                    </div>
                    <div className="card-footer">
                        <button className="btn-success"><span className="header-font-1">PAY NOW</span></button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cart;
