import React from 'react';
import '../styles/ObservationsList.css';

const ObservationsList = ({ observations }) => {
    const getInterpretationColor = (interpretation) => {
        switch (interpretation?.[0]?.toLowerCase()) {
            case 'normal': return 'interpretation-normal';
            case 'high': return 'interpretation-high';
            case 'low': return 'interpretation-low';
            default: return 'interpretation-normal';
        }
    };

    return (
        <div className="observations-section">
            <h2 className="section-title">Observations</h2>
            <div className="observations-grid">
                {observations.map(observation => (
                    <div key={observation._id} className="observation-card">
                        <div className="observation-header">
                            <span className="observation-type">{observation.code}</span>
                            <span className={`interpretation-badge ${getInterpretationColor(observation.interpretation)}`}>
                                {observation.interpretation?.[0] || 'Normal'}
                            </span>
                        </div>
                        <div className="observation-value-container">
                            <span className="observation-value">
                                {observation.valueString || observation.valueInteger}
                            </span>
                            <span className="observation-date">
                                {new Date(observation.effectiveDateTime).toLocaleDateString()}
                            </span>
                        </div>
                        {observation.note && observation.note.length > 0 && (
                            <div className="observation-notes">
                                {observation.note.map((note, index) => (
                                    <p key={index}>{note}</p>
                                ))}
                            </div>
                        )}
                        {observation.component && (
                            <div className="observation-components">
                                {observation.component.map((comp, index) => (
                                    <div key={index} className="component-item">
                                        <span className="component-label">{comp.code}:</span>
                                        <span className="component-value">{comp.valueInteger}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ObservationsList;