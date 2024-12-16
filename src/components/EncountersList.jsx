import React, { useState, useEffect } from 'react';
import { getAllProfessionals } from '../services/professionalService';
import '../styles/EncountersList.css';
import NewEncounterModal from './NewEncounterModal';

const EncountersList = ({ encounters, patientId, onEncounterCreated }) => {
    const [practitioners, setPractitioners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showNewEncounterModal, setShowNewEncounterModal] = useState(false);

    const formatDateTime = (dateString) => {
        if (!dateString) return 'No date provided';

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid date';

        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        const fetchPractitioners = async () => {
            try {
                const data = await getAllProfessionals();
                setPractitioners(data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching practitioners data');
                setLoading(false);
            }
        };

        fetchPractitioners();
    }, []);

    const getPractitionerName = (participant) => {
        if (!participant?.individual) return 'Unknown';
        const practitioner = practitioners.find(p => p._id === participant.individual);
        return practitioner ? practitioner.name : 'Unknown';
    };

    return (
        <div className="encounters-container">
            <div className="encounters-header">
                <h2 className="encounters-title">Patient Encounters</h2>
                <button
                    className="new-encounter-button"
                    onClick={() => setShowNewEncounterModal(true)}
                >
                    New Encounter
                </button>
            </div>

            {showNewEncounterModal && (
                <NewEncounterModal
                    patientId={patientId}
                    practitioners={practitioners}
                    onClose={() => setShowNewEncounterModal(false)}
                    onEncounterCreated={(newEncounter) => {
                        onEncounterCreated(newEncounter);
                        setShowNewEncounterModal(false);
                    }}
                />
            )}

            <div className="encounters-list">
                {encounters.map(encounter => (
                    <div key={encounter._id} className="encounter-item">
                        <div className="encounter-header">
                            <div className="encounter-date">
                                <span>{formatDateTime(encounter?.period?.start)}</span>
                                {encounter?.period?.end && (
                                    <span className="encounter-time">
                                        {' '} - {formatDateTime(encounter.period.end)}
                                    </span>
                                )}
                            </div>
                            <span className={`encounter-status status-${(encounter?.status || 'unknown').toLowerCase()}`}>
                                {encounter?.status || 'Unknown'}
                            </span>
                        </div>
                        <div className="encounter-details">
                            <div className="detail-item">
                                <span className="detail-label">Class</span>
                                <span className="detail-value">{encounter?.class || 'Not specified'}</span>
                            </div>
                            {encounter?.reasonCode?.length > 0 && (
                                <div className="detail-item">
                                    <span className="detail-label">Reason</span>
                                    <span className="detail-value">{encounter.reasonCode.join(', ')}</span>
                                </div>
                            )}
                            {encounter?.participant?.length > 0 && (
                                <div className="detail-item">
                                    <span className="detail-label">Participants</span>
                                    <span className="detail-value">
                                        {encounter.participant.map(p => getPractitionerName(p)).join(', ')}
                                    </span>
                                </div>
                            )}
                            {encounter?.diagnosis?.length > 0 && (
                                <div className="detail-item">
                                    <span className="detail-label">Diagnoses</span>
                                    <span className="detail-value">
                                        {encounter.diagnosis.length} diagnosis record(s)
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EncountersList;