import React from 'react';

const AlertsList = ({ alerts }) => {
    if (!alerts || alerts.length === 0) {
        return <div>No alerts found.</div>;
    }

    return (
        <div>
            <h2>Alerts</h2>
            <ul>
                {alerts.map((alert, index) => (
                    <li key={index}>
                        <strong>{alert.title}</strong>
                        <p>{alert.message}</p>
                        <p>Timestamp: {new Date(alert.timestamp).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AlertsList;