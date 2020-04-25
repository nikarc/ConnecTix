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

import Picker from '../components/Picker';

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
            <div id="Event" className="page-wrap">
                <div className="page-container">
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
                <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path d="M0,96L26.7,117.3C53.3,139,107,181,160,208C213.3,235,267,245,320,208C373.3,171,427,85,480,58.7C533.3,32,587,64,640,80C693.3,96,747,96,800,101.3C853.3,107,907,117,960,133.3C1013.3,149,1067,171,1120,176C1173.3,181,1227,171,1280,149.3C1333.3,128,1387,96,1413,80L1440,64L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
                <div className="blue-background"></div>
            </div>
        );
    }

    if (loading) return <div>Loading...</div>;
};

export default Event;
