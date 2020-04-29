import React, { Fragment } from 'react';
import { formatDollars } from '../utils/helpers';

import StatusBadge from './StatusBadge';

import { Order } from '../interfaces/order';
interface UserOrderCardProps {
    order: Order
}

const UserOrderCard: React.FC<UserOrderCardProps> = ({ order }) => {
    return (
        <Fragment>
            <div className="card">
                <div className="card-header">
                    <h2>{order.confirmation}</h2>
                    <StatusBadge status={order.order_status.type} />
                </div>
                <div className="card-body">
                    <p>Total: ${formatDollars(order.total)}</p>
                    <ul>
                        {order.tickets.map((ticket, key) => (
                            <li key={key}>1x ${formatDollars(ticket.price)}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Fragment>
    )
}

export default UserOrderCard;
