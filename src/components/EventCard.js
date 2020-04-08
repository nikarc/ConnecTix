import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => (
    <div className="event-card card">
        <div className="card-image" style={{ backgroundImage: `url(${event.image})` }}></div>
        <div className="card-details">
            <h3 className="event-title">
                {event.title}
            </h3>
            <p>{event.date}</p>
            <div className="event-description">
                <p>
                    {event.description}
                </p>
            </div>
            <Link to={`/events/${event.id}`} className="btn cta">Buy Tickets<i></i></Link>
        </div>
    </div>
);

export default EventCard;
