import React, { useState } from 'react';

import { JSEvent } from '../interfaces/global';

interface PickerProps {
    onUpdate?: (newCount: number) => void
    disabled?: boolean
    max?: number
}

const Picker: React.FC<PickerProps> = ({ onUpdate, disabled, max }) => {
    const [ticketCount, setTicketCount] = useState(0);
    const updateTicketCount = (offset: number = 1) => {
        if (offset > 0 && ticketCount === 10) return;
        if (ticketCount > 0 || offset > 0) {
            const newCount = ticketCount + offset;
            setTicketCount(newCount);
            if (onUpdate) onUpdate(newCount);
        }
    }

    const changeTicketCount = (e: JSEvent) => {
        let count = parseInt(e.target.value);
        let _max = max || 10;

        if (count > _max) count = _max;

        setTicketCount(count);
        if (onUpdate) onUpdate(count);
    }

    return (
        <div className="picker">
            <button className="btn btn-flat" onClick={updateTicketCount.bind(null, -1)} disabled={disabled}>-</button>
            <input type="number" value={ticketCount} min="0" max={max || 10} onChange={changeTicketCount} disabled={disabled} />
            <button className="btn btn-flat" onClick={updateTicketCount.bind(null, 1)} disabled={disabled}>+</button>
        </div>
    )
}

Picker.defaultProps = {
    onUpdate: () => {},
    disabled: false,
    max: 10
}

export default Picker;
