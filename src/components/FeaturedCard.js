import React from 'react';
import { Link } from 'react-router-dom';
import slug from 'slug';

import CalendarIcon from '../components/CalendarIcon';

export default function FeaturedCard ({ featuredEvent }) {
    const { venueByVenue: { name: venueName } } = featuredEvent;
    return (
        <div className="featured-card floating-card image-card">
            <div className="card-image" style={{ backgroundImage: `url(${featuredEvent.image})`}}></div>
            <div className="image-card--content">
                <div className="card-header">
                    <h2>{featuredEvent.title}</h2>
                    <Link to={`/venues/${slug(venueName)}`}><small>@ {venueName}</small></Link>
                </div>
                <div className="card-body">
                    <p>{featuredEvent.description}</p>
                    <CalendarIcon eventDate={featuredEvent.date} />
                </div>
                <div className="card-footer">
                    <Link to={`/events/${featuredEvent.id}`} className="btn cta">Buy Tickets<i></i></Link>
                </div>
            </div>
        </div>
    )
}
