import React, { useState } from 'react';
import axios from 'axios';
import '../styles/NewEncounterModal.css';

const NewEncounterModal = ({ patientId, practitioners, onClose, onEncounterCreated }) => {
    // Format today's date to YYYY-MM-DDTHH:mm format for datetime-local input
    const today = new Date().toISOString().slice(0, 16);

    const [encounterData, setEncounterData] = useState({
        status: 'planned',
        class: 'ambulatory',
        type: [],
        subject: patientId,
        participant: [{
            individual: '',
            period: { start: today }
        }],
        period: {
            start: today,
            end: ''
        },
        reasonCode: [''],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create a copy of the data and ensure subject is set
            const submitData = {
                ...encounterData,
                subject: patientId // Explicitly set subject again to ensure it's included
            };

            const response = await axios.post('http://localhost:5000/api/encounters', submitData);
            onEncounterCreated(response.data);
            onClose();
        } catch (error) {
            console.error('Error creating encounter:', error);
            alert('Failed to create encounter: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>New Encounter</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Status</label>
                        <select
                            value={encounterData.status}
                            onChange={(e) => setEncounterData({
                                ...encounterData,
                                status: e.target.value
                            })}
                        >
                            <option value="planned">Planned</option>
                            <option value="in-progress">In Progress</option>
                            <option value="finished">Finished</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Class</label>
                        <select
                            value={encounterData.class}
                            onChange={(e) => setEncounterData({
                                ...encounterData,
                                class: e.target.value
                            })}
                        >
                            <option value="ambulatory">Ambulatory</option>
                            <option value="emergency">Emergency</option>
                            <option value="home">Home Visit</option>
                            <option value="virtual">Virtual</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Practitioner</label>
                        <select
                            value={encounterData.participant[0].individual}
                            onChange={(e) => setEncounterData({
                                ...encounterData,
                                participant: [{
                                    ...encounterData.participant[0],
                                    individual: e.target.value
                                }]
                            })}
                        >
                            <option value="">Select a practitioner</option>
                            {practitioners.map(p => (
                                <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Start Date</label>
                        <input
                            type="datetime-local"
                            value={encounterData.period.start}
                            onChange={(e) => setEncounterData({
                                ...encounterData,
                                period: { ...encounterData.period, start: e.target.value }
                            })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Reason</label>
                        <input
                            type="text"
                            value={encounterData.reasonCode[0]}
                            onChange={(e) => setEncounterData({
                                ...encounterData,
                                reasonCode: [e.target.value]
                            })}
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="cancel-button">
                            Cancel
                        </button>
                        <button type="submit" className="submit-button">
                            Create Encounter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewEncounterModal;