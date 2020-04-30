import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectOrder } from '../store/orderSlice';
import { finalizeOrderAsync } from '../store/orderAsyncCalls';
import { useSelector } from 'react-redux';
import {
    CardElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import history from '../utils/history';
import { useAuth0 } from '../react-auth0-spa';

interface CardError {
    message?: string
}

export default function CheckoutForm () {
    const { idToken } = useAuth0();
    const dispatch = useDispatch();
    const { order } = useSelector(selectOrder);
    const stripe = useStripe();
    const elements = useElements();
    const [cardIsValid, setCardIsValid] = useState(false);
    const [cardError, setCardError] = useState<CardError>({});

    if (!order) return <Redirect to="/" />;

    const validateCard = (event: any) => {
        if (event.complete) {
            return setCardIsValid(true);
        } else if (event.error) {
            console.error(event.error);
        }

        setCardIsValid(false);
    }

    const submitOrder = async (event: any) => {
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe not loaded, return
            return;
        }

        const cardElement: any = elements.getElement(CardElement);

        const { error, paymentMethod }: any = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });

        if (error) return setCardError(error);

        const { id: sid, card }: { id: string, card: any } = paymentMethod;
        const orderId = order.id;

        await dispatch(finalizeOrderAsync(card.last4, orderId, sid, idToken));
        history.push(`/confirmation?order=${orderId}`);
    }
    
    return (
        <form onSubmit={submitOrder}>
            <div className="FormGroup">
                <div className="FormRow">
                    {cardError && cardError.message && <div className="card-error error-message"></div>}
                    <CardElement 
                        options={{
                            style: {
                                base: {
                                    color: '#697386',
                                    fontWeight: '500',
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
