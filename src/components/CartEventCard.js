import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '../react-auth0-spa';
import { removeTickets } from '../store/orderSlice';
import { DateFormat } from '../utils/dates';
    
export default function CartEventCard ({ events }) {
    const { idToken } = useAuth0();
    const dispatch = useDispatch();

    const removeTicket = eventId => {
       dispatch(removeTickets(eventId, 1, idToken));
    }

    return (
        <Fragment>
            {Object.keys(events).length && Object.keys(events).map((eventId, key) => {
                const event = events[eventId];
                return (
                    <div className="card" key={key}>
                        <div className="card-header">
                            <h2>{event.title}</h2>
                            <span><small>@ {event.venueByVenue.name}</small></span>
                            <span className="event-total">${(event.available_tickets.reduce((acc, ticket) => acc + ticket.price, 0) / 100).toFixed(2)}</span>
                        </div>
                        <div className="card-body">
                            <div className="address-details">
                                <p>{DateFormat(event.date)}</p>
                                <p>{event.addressByAddress.address_1}</p>
                                {event.addressByAddress.address_2 && <p>{event.addressByAddress.address_2}</p>}
                                <p>{event.addressByAddress.city} {event.addressByAddress.state}, {event.addressByAddress.zip}</p>
                            </div>
                            <div className="hr"></div>
                            <ul>
                                {events[eventId].available_tickets.length && events[eventId].available_tickets.map((ticket, ticketKey) => (
                                    <li key={`${key}:${ticketKey}`}>
                                        <p>x1 ticket @ ${(ticket.price / 100).toFixed(2)}</p>
                                        <button onClick={removeTicket.bind(this, eventId)}><i className="icon-trash"></i></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            })}
        </Fragment>
    );
}
