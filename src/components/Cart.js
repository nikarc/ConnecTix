import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrder } from '../store/orderSlice';
import {
    CardElement,
    // useStripe,
    // useElements
} from '@stripe/react-stripe-js';

import CartEventCard from './CartEventCard';

const formattedOrderTotal = orderTotal => (orderTotal / 100).toFixed(2);

const Cart = () => {
    const { order } = useSelector(selectOrder);
    // const stripe = useStripe();
    // const elements = useElements();
    const [cardIsValid, setCardIsValid] = useState(false);

    const [orderTotal] = useState(Object.keys(order.events).reduce((acc, e) => acc + order.events[e].available_tickets.reduce((_acc, t) => _acc + t.price, 0), 0));

    const validateCard = event => {
        if (event.complete) {
            return setCardIsValid(true);
        } else if (event.error) {
            console.error(event.error);
        }

        setCardIsValid(false);
    }
    return (
        <div id="Cart" className="columns">
            <div className="cart-details column is-two-thirds">
                <CartEventCard events={order.events} />
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
                        <form>
                            <div className="FormGroup">
                                <div className="FormRow">
                                    <CardElement 
                                        options={{
                                            style: {
                                                base: {
                                                    color: '#697386',
                                                    fontWeight: 500,
                                                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                                                    fontSize: '16px',
                                                    fontSmoothing: 'antialiased',
                                                    ':-webkit-autofill': {color: '#fce883'},
                                                    '::placeholder': {color: 'rgba(105, 115, 134, 0.5)'},
                                                },
                                                invalid: {
                                                    color: '#9e2146',
                                                }
                                            }
                                        }}
                                        onChange={validateCard}
                                    />
                                </div>
                            </div>
                            <small><i>*HINT: You can use the credit card number 4242 4242 4242 4242 with any expiration/CVC/zip code, to test the checkout functionality.</i></small>
                            <button
                                className="btn-success"
                                disabled={!cardIsValid}>
                                <span className="header-font-2">PAY NOW</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cart;
