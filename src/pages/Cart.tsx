import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectOrder } from '../store/orderSlice';
import { formatDollars } from '../utils/helpers';

import CartEventCard from '../components/CartEventCard';
import CheckoutForm from '../components/CheckoutForm';

const Cart = () => {
    const { order } = useSelector(selectOrder);
    const [orderTotal, setOrderTotal] = useState(0)

    useEffect(() => {
        if (order) setOrderTotal(Object.keys(order.events).reduce((acc: number, e: any) => acc + order.events[e].available_tickets.reduce((_acc: number, t: any) => _acc + t.price, 0), 0));
    }, [order]);

    if (!order || !Object.keys(order.events).length) return <p>Cart is empty</p>;

    return (
        <div id="Cart" className="page-wrap">
            <div className="page-container columns">
                <div className="cart-details column is-two-thirds">
                    <CartEventCard events={order.events} />
                </div>
                <div className="mobile-indicator">
                    <span className="icon-arrow-down"></span>
                </div>
                <div className="cart-summary column is-one-third">
                    <div className="floating-card">
                        <div className="card-header">
                            <h2>Cart Summary</h2>
                        </div>
                        <div className="card-body">
                            <p>
                                <span>Subtotal: </span>
                                <span className="order-subtotal">${formatDollars(orderTotal)}</span>
                            </p>
                            <p>
                                <span>Taxes: </span>
                                <span className="taxesTotal">${formatDollars(orderTotal * 0.3)}</span>
                            </p>
                            <div className="hr"></div>
                            <p className="order-total">
                                <span>Total: </span>
                                <span>${formatDollars(orderTotal + (orderTotal * 0.3))}</span>
                            </p>
                        </div>
                        <div className="card-footer">
                            <CheckoutForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cart;
