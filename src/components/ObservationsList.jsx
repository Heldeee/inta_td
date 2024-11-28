import React from 'react';

const ObservationsList = ({ observations }) => {
    return (
        <div>
            <h2>Observations</h2>
            <ul>
                {observations.map(observation => (
                    <li key={observation.id}>
                        {observation.date}: {observation.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ObservationsList;