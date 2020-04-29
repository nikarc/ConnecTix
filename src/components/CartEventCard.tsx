import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '../react-auth0-spa';
import { removeTicketsAsync } from '../store/orderAsyncCalls';
import { DateFormat } from '../utils/dates';

import { Events, Event } from '../interfaces/events';
import { Ticket } from '../interfaces/ticket';
    
const CartEventCard: React.FC<{ events: Events }> = ({ events }) => {
    const { idToken } = useAuth0();
    const dispatch = useDispatch();

    const removeTicket = (eventId: string) => {
       dispatch(removeTicketsAsync(eventId, 1, idToken));
    }

    return (
        <Fragment>
            {Object.keys(events).length && Object.keys(events).map((eventId: string, key: number) => {
                const event: Event = events[eventId];
                return (
                    <div className="card" key={key}>
                        <div className="card-header">
                            <h2>{event.title}</h2>
                            <span><small>@ {event.venueByVenueId.name}</small></span>
                            <span className="event-total">${(event.available_tickets ? event.available_tickets.reduce((acc: number, ticket: Ticket) => acc + ticket.price, 0) / 100 : 0).toFixed(2)}</span>
                        </div>
                        <div className="card-body">
                            <div className="address-details">
                                <p>{DateFormat(event.date)}</p>
                                <p>{event.addressByAddressId?.address_1}</p>
                                {event.addressByAddressId?.address_2 && <p>{event.addressByAddressId?.address_2}</p>}
                                <p>{event.addressByAddressId?.city} {event.addressByAddressId?.state}, {event.addressByAddressId?.zip}</p>
                            </div>
                            <div className="hr"></div>
                            <ul>
                                {events[eventId].available_tickets?.length && events[eventId].available_tickets?.map((ticket, ticketKey) => (
                                    <li key={`${key}:${ticketKey}`}>
                                        <p>x1 ticket @ ${(ticket.price / 100).toFixed(2)}</p>
                                        <button onClick={removeTicket.bind(null, eventId)}><i className="icon-trash"></i></button>
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

export default CartEventCard;
