import React, { useState } from 'react';

const Picker = ({ onUpdate }) => {
    const [ticketCount, setTicketCount] = useState(0);
    const updateTicketCount = (offset: 1) => {
        if (ticketCount > 0 || offset > 0) {
            const newCount = ticketCount + offset;
            setTicketCount(newCount);
            onUpdate(newCount);
        }
    }

    const changeTicketCount = (e) => {
        const count = parseInt(e.target.value);
        setTicketCount(count);
        onUpdate(count);
    }

    return (
        <div className="picker">
            <button className="btn btn-flat" onClick={updateTicketCount.bind(this, -1)}>-</button>
            <input type="number" value={ticketCount} onChange={changeTicketCount} />
            <button className="btn btn-flat" onClick={updateTicketCount.bind(this, 1)}>+</button>
        </div>
    )
}

export default Picker;
