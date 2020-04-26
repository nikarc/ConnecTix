import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { EVENT_ATTRIBUTES } from '../utils/constants';

import EventCard from '../components/EventCard';
import FeaturedCard from '../components/FeaturedCard';

const GET_UPCOMING_EVENTS = gql`
    query getUpcomingEvents {
        events(limit: 3, order_by: { date: desc }) { ${EVENT_ATTRIBUTES} }
    }
`;

const Home = () => {
    const { loading, error, data } = useQuery(GET_UPCOMING_EVENTS);
    if (loading) return <div>Loading...</div>;
    
    if (error) {
        return <pre>{JSON.stringify(error, null, 2)}</pre>
    }

    const featuredEvent = data.events && data.events[0];

    return (
        <div id="Home" className="page-wrap">
            <div className="hero">
                <div className="hero-content">
                    <h1>ConnecTix</h1>
                    <div id="FeaturedEvent">
                        <p className="header-font-1">What's trending near you:</p>
                        <FeaturedCard featuredEvent={featuredEvent} />
                    </div>
                </div>
                <svg className="wave wave__light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path d="M0,160L60,149.3C120,139,240,117,360,122.7C480,128,600,160,720,149.3C840,139,960,85,1080,80C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg>
                <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path d="M0,288L80,266.7C160,245,320,203,480,208C640,213,800,267,960,272C1120,277,1280,235,1360,213.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            </div>
            <div className="page-container">
                <ul className="event-list">
                    {data.events && data.events.map((event, index) => (
                        <li key={index}>
                            <EventCard event={event} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
