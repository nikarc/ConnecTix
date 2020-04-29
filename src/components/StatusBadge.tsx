import React from 'react';

interface StatusBadgeProps {
    status: string
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    return (
        <div className={`status-badge ${status}`}>{status}</div>
    )
}

export default StatusBadge;
