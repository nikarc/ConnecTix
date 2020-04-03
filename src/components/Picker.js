import React, { useState } from 'react';

const Picker = ({ onUpdate, disabled, max }) => {
    const [ticketCount, setTicketCount] = useState(0);
    const updateTicketCount = (offset: 1) => {
        if (offset > 0 && ticketCount === 10) return;
        if (ticketCount > 0 || offset > 0) {
            const newCount = ticketCount + offset;
            setTicketCount(newCount);
            onUpdate(newCount);
        }
    }

    const changeTicketCount = (e) => {
        let count = parseInt(e.target.value);
        let _max = max || 10;

        if (count > _max) count = _max;

        setTicketCount(count);
        onUpdate(count);
    }

    return (
        <div className="picker">
            <button className="btn btn-flat" onClick={updateTicketCount.bind(this, -1)} disabled={disabled}>-</button>
            <input type="number" value={ticketCount} min="0" max={max || 10} onChange={changeTicketCount} disabled={disabled} />
            <button className="btn btn-flat" onClick={updateTicketCount.bind(this, 1)} disabled={disabled}>+</button>
        </div>
    )
}

export default Picker;
