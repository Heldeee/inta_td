import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewObservationModal.css';

const NewObservationModal = ({ patientId, onClose, onObservationCreated }) => {
    const [observationData, setObservationData] = useState({
        status: 'final',
        code: '',
        subject: patientId,  // Initialize with patientId
        effectiveDateTime: new Date().toISOString(),
        valueString: '',
        valueInteger: '',
        interpretation: ['normal'],
        note: ['']
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure subject is explicitly set before submission
            const dataToSubmit = {
                ...observationData,
                subject: patientId,  // Explicitly set patientId
                effectiveDateTime: new Date().toISOString()  // Ensure date is in proper format
            };

            console.log('Submitting observation data:', dataToSubmit); // Debug log

            const response = await axios.post('http://localhost:5000/api/observations', dataToSubmit);
            onObservationCreated(response.data);
            onClose();
        } catch (error) {
            console.error('Error creating observation:', error);
            console.error('Request data:', observationData); // Debug log
            alert('Failed to create observation: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>New Observation</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Code/Type</label>
                        <input
                            type="text"
                            value={observationData.code}
                            onChange={(e) => setObservationData({
                                ...observationData,
                                code: e.target.value
                            })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Status</label>
                        <select
                            value={observationData.status}
                            onChange={(e) => setObservationData({
                                ...observationData,
                                status: e.target.value
                            })}
                        >
                            <option value="preliminary">Preliminary</option>
                            <option value="final">Final</option>
                            <option value="amended">Amended</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Value Type</label>
                        <select
                            onChange={(e) => {
                                const newData = { ...observationData };
                                if (e.target.value === 'string') {
                                    delete newData.valueInteger;
                                    newData.valueString = '';
                                } else {
                                    delete newData.valueString;
                                    newData.valueInteger = '';
                                }
                                setObservationData(newData);
                            }}
                        >
                            <option value="string">Text</option>
                            <option value="integer">Number</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Value</label>
                        {observationData.hasOwnProperty('valueString') ? (
                            <input
                                type="text"
                                value={observationData.valueString}
                                onChange={(e) => setObservationData({
                                    ...observationData,
                                    valueString: e.target.value
                                })}
                                required
                            />
                        ) : (
                            <input
                                type="number"
                                value={observationData.valueInteger}
                                onChange={(e) => setObservationData({
                                    ...observationData,
                                    valueInteger: parseInt(e.target.value)
                                })}
                                required
                            />
                        )}
                    </div>

                    <div className="form-group">
                        <label>Interpretation</label>
                        <select
                            value={observationData.interpretation[0]}
                            onChange={(e) => setObservationData({
                                ...observationData,
                                interpretation: [e.target.value]
                            })}
                        >
                            <option value="normal">Normal</option>
                            <option value="high">High</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Note</label>
                        <textarea
                            value={observationData.note[0]}
                            onChange={(e) => setObservationData({
                                ...observationData,
                                note: [e.target.value]
                            })}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            Create Observation
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewObservationModal;