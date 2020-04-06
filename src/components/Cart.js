import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTickets, removeTicket } from '../store/ticketsSlice';
import { DateFormat } from '../utils/dates';

const Cart = () => {
    const events = useSelector(selectTickets);
    const dispatch = useDispatch();

    return (
        <div id="Cart">
            {Object.keys(events).length && Object.keys(events).map((eventId, key) => {
                const event = events[eventId];
                return (
                    <div className="floating-card" key={key}>
                        <div className="card-header">
                            <h2>{event.title}</h2>
                            <span><small>@ {event.venueByVenue.name}</small></span>
                            <span className="event-total">${(event.tickets.reduce((acc, ticket) => acc + ticket.price, 0) / 100).toFixed(2)}</span>
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
                                {events[eventId].tickets.length && events[eventId].tickets.map((ticket, ticketKey) => (
                                    <li key={`${key}:${ticketKey}`}>
                                        <p>x1 ticket @ ${(ticket.price / 100).toFixed(2)}</p>
                                        <button onClick={() => dispatch(removeTicket({ eventId }))}><i className="icon-trash"></i></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }
            )}
        </div>
    )
};

export default Cart;
