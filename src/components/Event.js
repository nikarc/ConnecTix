import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { EVENT_ATTRIBUTES } from '../utils/constants';
import { updateForEvent } from '../store/ticketsSlice';

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

const Event = ({ match }) => {
    const { eventId } = match.params;

    const history = useHistory();
    const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
        variables: { eventId }
    });

    /* Redux store logic */
    const dispatch = useDispatch();

    const [ticketCount, setTicketCount] = useState(0);
    const addTicketsToCart = () => {
        setTicketCount(ticketCount);
        dispatch(updateForEvent({ eventId, ticketCount }));

        history.push('/cart');
    }

    if (loading) return <div>Loading...</div>;

    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    const { events_by_pk: _event } = data;
    const available_tickets = _event.available_tickets.length;

    return (
        <div id="Event">
            <div className="event-header">
                <div className="event-image">
                    <img src={_event.image} alt={_event.title} />
                </div>
                <div className="event-details">
                    <div className="event-title-wrap">
                        <h2>{_event.title}</h2>
                        <small>{_event.date}</small>
                    </div>
                    <p className="event-description">{_event.description}</p>
                    <Picker onUpdate={setTicketCount} disabled={available_tickets.length} />
                    <button className="btn add-to-cart" onClick={addTicketsToCart} disabled={!ticketCount}>Buy Tickets</button>
                    <small>{available_tickets} Ticket{available_tickets > 1 ? 's' : ''} left!</small>
                </div>
            </div>
        </div>
    );
};

export default Event;
