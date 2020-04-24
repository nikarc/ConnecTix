import React from 'react';

export default function CalendarIcon ({ eventDate }) {
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
        { value: year },,
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
