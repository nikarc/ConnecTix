import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { selectOrder, finalizeOrder } from '../store/orderSlice';
import { useSelector } from 'react-redux';
import {
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import history from '../utils/history';

const ORDER_COMPLETE_UPDATE = gql`
    mutation orderComplete($lastFour: String!, $order: Int!, $sid: String!) {
      insert_stripe_payment(objects: [{
        last_four: $lastFour
        order: $order
        stripe_id: $sid
      }]) {
        affected_rows
      }
    }
`;

export default function CheckoutForm () {
    const dispatch = useDispatch();
    const { order } = useSelector(selectOrder);
    const stripe = useStripe();
    const elements = useElements();
    const [cardIsValid, setCardIsValid] = useState(false);
    const [cardError, setCardError] = useState(null);
    const [orderUpdateComplete, { data }] = useMutation(ORDER_COMPLETE_UPDATE);

    const validateCard = event => {
        if (event.complete) {
            return setCardIsValid(true);
        } else if (event.error) {
            console.error(event.error);
        }

        setCardIsValid(false);
    }

    const submitOrder = async event => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe not loaded, return
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });

        if (error) return setCardError(error);

        const { id: sid, card } = paymentMethod;
        const orderId = order.id;
        orderUpdateComplete({
            variables: {
                sid,
                lastFour: card.last4,
                order: orderId
            }
        });
        await dispatch(finalizeOrder());
        history.push(`/confirmation?order=${orderId}`);
    }
    
    return (
        <form onSubmit={submitOrder}>
            <div className="FormGroup">
                <div className="FormRow">
                    {cardError && <div className="card-error error-message"></div>}
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
    )
}
