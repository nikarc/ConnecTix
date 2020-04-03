import React, { useState } from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { EVENT_ATTRIBUTES } from '../utils/constants';

import Picker from './Picker';

const GET_EVENT_BY_ID = gql`
    query getEventById($eventId: Int!) {
        events_by_pk(id: $eventId) { ${EVENT_ATTRIBUTES} }
    }
`;

const Event = ({ match }) => {
    const { eventId } = match.params;
    const { loading, error, data } = useQuery(GET_EVENT_BY_ID, {
        variables: { eventId }
    });
    const [ticketCount, setTicketCount] = useState(0);

    if (loading) return <div>Loading...</div>;

    if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

    const { events_by_pk: _event } = data;

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
                    <Picker onUpdate={setTicketCount} />
                    <button className="btn add-to-cart" disabled={!ticketCount}>Buy Tickets</button>
                </div>
            </div>
        </div>
    )
}

export default Event;
