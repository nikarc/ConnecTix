import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { EVENT_ATTRIBUTES } from '../utils/constants';
import { Link } from 'react-router-dom';

import EventCard from './EventCard';

const GET_UPCOMING_EVENTS = gql`
    query getUpcomingEvents {
        events(limit: 10, order_by: { date: desc }) { ${EVENT_ATTRIBUTES} }
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
        <div id="Home">
            <div className="hero">
                <div className="hero-content">
                    <h1>ConnecTix</h1>
                    <div id="FeaturedEvent">
                        <p className="header-font-1">What's trending near you:</p>
                        <div className="featured-card floating-card image-card">
                            <div className="card-image" style={{ backgroundImage: `url(${featuredEvent.image})`}}></div>
                            <div className="image-card--content">
                                <div className="card-header"><h2>{featuredEvent.title}</h2></div>
                                <div className="card-body"><p>{featuredEvent.description}</p></div>
                                <div className="card-footer">
                                    <Link to={`/events/${featuredEvent.id}`} className="btn cta">Buy Tickets<i></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d788a5" fillOpacity="1" d="M0,288L80,266.7C160,245,320,203,480,208C640,213,800,267,960,272C1120,277,1280,235,1360,213.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
            </div>
            <div className="page-wrap">
                <ul>
                    {data.events && data.events.slice(1).map((event, index) => (
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
