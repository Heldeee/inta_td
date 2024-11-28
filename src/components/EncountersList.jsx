import React from 'react';

const EncountersList = ({ encounters }) => {
    return (
        <div>
            <h2>Encounters</h2>
            <ul>
                {encounters.map(encounter => (
                    <li key={encounter.id}>
                        {encounter.date}: {encounter.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EncountersList;