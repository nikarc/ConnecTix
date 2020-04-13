import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useAuth0 } from '../react-auth0-spa';
import { EVENT_ATTRIBUTES } from '../utils/constants';
import { selectOrder } from '../store/orderSlice';
import {
    updateOrderByIdAsync,
    addTicketsAsync,
} from '../store/orderAsyncCalls';
import { DateFormat } from '../utils/dates';
import { useSelector } from 'react-redux';
import history from '../utils/history';

import Picker from './Picker';

const GET_EVENT_BY_ID = gql`
    query getEventById($eventId: Int!) {
        events_by_pk(id: $eventId) {
            ${EVENT_ATTRIBUTES}
            available_tickets {
                id
                price
            }
        }
    }
`;

const Event = ({ match, idToken }) => {
    const { order } = useSelector(selectOrder);
    const { eventId } = match.params;
    const { user } = useAuth0();

    const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
        variables: { eventId }
    });

    /* Redux store logic */
    const dispatch = useDispatch();

    const [ticketCount, setTicketCount] = useState(0);
    const addTicketsToCart = async () => {
        setTicketCount(ticketCount);
        let userEmail;

        if (user && user.email) userEmail = user.email;
        if (!order) await dispatch(updateOrderByIdAsync(userEmail, idToken));
        await dispatch(addTicketsAsync(eventId, ticketCount, idToken));

        history.push('/cart');
    }

    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    if (data) {
        const { events_by_pk: _event } = data;
        const available_tickets = _event.available_tickets.length;

        return (
            <div id="Event">
                <div className="page-wrap">
                    <div className="event-header">
                        <div className="event-image">
                            <img src={_event.image} alt={_event.title} />
                        </div>
                        <div className="event-details">
                            <div className="event-title-wrap">
                                <h2>{_event.title}</h2>
                                <small>{DateFormat(_event.date)}</small>
                            </div>
                            <p className="event-description">{_event.description}</p>
                            <Picker onUpdate={setTicketCount} disabled={available_tickets.length} />
                            <button className="btn add-to-cart" onClick={addTicketsToCart} disabled={!ticketCount}>Buy Tickets</button>
                            <small>{available_tickets} Ticket{available_tickets > 1 ? 's' : ''} left!</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) return <div>Loading...</div>;
};

export default Event;
