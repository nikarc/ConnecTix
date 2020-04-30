import React, { FC } from 'react';

interface CalendarIconProps {
    eventDate: string
}

const CalendarIcon: FC<CalendarIconProps> = ({ eventDate }) => {
    const dtFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        dayPeriod: 'short'
    });
    const date = new Date(eventDate);
    const [
        { value: weekday },,
        { value: month },,
        { value: day },,
        { value: hour },,
        { value: minute },,
        { value: dayPeriod }
    ] = dtFormatter.formatToParts(date);

    return (
        <div className="calendar-icon">
            <div className="time">{`${hour}:${minute} ${dayPeriod}`}</div>
            <div className="date-wrap">
                <p className="weekday">{weekday}</p>
                <p className="date">{month} {day}</p>
            </div>
        </div>
    );
}

export default CalendarIcon;
