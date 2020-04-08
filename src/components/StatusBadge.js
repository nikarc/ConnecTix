import React from 'react';

export default function StatusBadge ({ status }) {
    return (
        <div className={`status-badge ${status}`}>{status}</div>
    )
}
