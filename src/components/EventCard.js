import React from 'react';

const EventCard = ({ event }) => (
    <div className="event-card card">
        <div className="card-image" style={{ backgroundImage: `url(${event.image})` }}></div>
        <h3 className="event-title">
            {event.title}
        </h3>
    </div>
);

export default EventCard;
