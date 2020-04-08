import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { EVENT_ATTRIBUTES } from '../utils/constants';

import EventCard from './EventCard';

const GET_UPCOMING_EVENTS = gql`
    query getUpcomingEvents {
        events(limit: 10, order_by: { date: desc }) { ${EVENT_ATTRIBUTES} }
    }
`;

const Home = props => (
    <div id="Home">
        <ul>
            {props.events && props.events.map((event, index) => (
                <li key={index}>
                    <EventCard event={event} />
                </li>
            ))}
        </ul>
    </div>
);

const UpcomingEventQuery = () => {
    const { loading, error, data } = useQuery(GET_UPCOMING_EVENTS);
    if (loading) return <div>Loading...</div>;
    
    if (error) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>
    }

    return <Home events={data.events} />
}

export default UpcomingEventQuery;
