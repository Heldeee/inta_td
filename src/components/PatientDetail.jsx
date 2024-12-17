import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/PatientDetail.css';
import ObservationsList from './ObservationsList';
import EncountersList from './EncountersList';

const PatientDetail = ({ patient: initialPatient, userRole }) => {
    const [activeTab, setActiveTab] = useState('overall');
    const [encounters, setEncounters] = useState([]);
    const [observations, setObservations] = useState([]);
    const [cabinet, setCabinet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [patient, setPatient] = useState(initialPatient);
    const [editedPatient, setEditedPatient] = useState(initialPatient);

    const prettyDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    useEffect(() => {
        const fetchCabinet = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/cabinets/${patient.cabinetId}`);
                setCabinet(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching cabinet data');
                setLoading(false);
            }
        };

        fetchCabinet();
    }, [patient.cabinetId]);

    useEffect(() => {
        setPatient(initialPatient);
        setEditedPatient(initialPatient);
        setActiveTab('overall');
    }, [initialPatient]);

    useEffect(() => {
        const fetchEncounters = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/encounters/patient/${patient._id}`);
                setEncounters(response.data);
            } catch (error) {
                console.error('Error fetching encounters:', error);
            }
        };

        const fetchObservations = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/observations/patient/${patient._id}`);
                setObservations(response.data);
            } catch (error) {
                console.error('Error fetching observations:', error);
            }
        };

        fetchEncounters();
        fetchObservations();
    }, [patient._id]);

    const sendPatientToFhir = async () => {
        try {
            console.log(patient._id);
            const response = await axios.post(`http://localhost:5000/api/patients/transfer`, {}, { headers: { id: patient._id } });
            alert('Patient data sent to FHIR server successfully');
        } catch (error) {
            console.error('Error sending patient data to FHIR server:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedPatient(patient);
    };

    const handleChange = (field, value) => {
        setEditedPatient(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            // Format the date to ensure it's in the correct format
            const patientToUpdate = {
                ...editedPatient,
                dateOfBirth: new Date(editedPatient.dateOfBirth).toISOString()
            };
            const response = await axios.put(`http://localhost:5000/api/patients/${patient._id}`, patientToUpdate);
            setPatient(response.data);
            setIsEditing(false);
            alert('Patient updated successfully');
        } catch (error) {
            console.error('Error updating patient:', error);
            alert('Error updating patient: ' + error.response?.data?.error || error.message);
        }
    };

    if (loading) {
        return <div>Loading patient details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const renderTabButtons = () => (
        <div className="tabs-header">
            <button
                className={`tab-button ${activeTab === 'overall' ? 'active' : ''}`}
                onClick={() => setActiveTab('overall')}
            >
                Overall Information
            </button>
            {userRole === 'doctor' && (
                <>
                    <button
                        className={`tab-button ${activeTab === 'encounters' ? 'active' : ''}`}
                        onClick={() => setActiveTab('encounters')}
                    >
                        Encounters
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'observations' ? 'active' : ''}`}
                        onClick={() => setActiveTab('observations')}
                    >
                        Observations
                    </button>
                </>
            )}
        </div>
    );

    const renderOverallTab = () => (
        <>
            <div className="section-block">
                <h3 className="section-block-title">General Information</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Name</span>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedPatient.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="edit-input"
                            />
                        ) : (
                            <span className="info-value">{patient.name}</span>
                        )}
                    </div>
                    <div className="info-item">
                        <span className="info-label">Date of Birth</span>
                        {isEditing ? (
                            <input
                                type="date"
                                value={editedPatient.dateOfBirth.split('T')[0]}
                                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                                className="edit-input"
                            />
                        ) : (
                            <span className="info-value">{prettyDate(patient.dateOfBirth)}</span>
                        )}
                    </div>
                    <div className="info-item">
                        <span className="info-label">Gender</span>
                        {isEditing ? (
                            <select
                                value={editedPatient.gender}
                                onChange={(e) => handleChange('gender', e.target.value)}
                                className="edit-input"
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        ) : (
                            <span className="info-value">{patient.gender}</span>
                        )}
                    </div>
                    <div className="info-item">
                        <span className="info-label">Marital Status</span>
                        {isEditing ? (
                            <select
                                value={editedPatient.maritalStatus}
                                onChange={(e) => handleChange('maritalStatus', e.target.value)}
                                className="edit-input"
                            >
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                                <option value="separated">Separated</option>
                            </select>
                        ) : (
                            <span className="info-value">{patient.maritalStatus}</span>
                        )}
                    </div>
                </div>
            </div>

            {cabinet && (
                <div className="section-block">
                    <h3 className="section-block-title">Cabinet Information</h3>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="info-label">Name</span>
                            <span className="info-value">{cabinet.name}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Address</span>
                            <span className="info-value">{cabinet.address}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Phone</span>
                            <span className="info-value">{cabinet.phone}</span>
                        </div>
                    </div>
                </div>
            )}

            {userRole === 'doctor' && (
                <>
                    {patient.urgentContact && (
                        <div className="section-block">
                            <h3 className="section-block-title">Emergency Contact</h3>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Name</span>
                                    <span className="info-value">{patient.urgentContact.name}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Phone Number</span>
                                    <span className="info-value">{patient.urgentContact.phoneNumber}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {patient.telecom && (
                        <div className="section-block">
                            <h3 className="section-block-title">Contact Information</h3>
                            <div className="info-grid">
                                {patient.telecom.map((contact, index) => (
                                    <div key={index} className="info-item">
                                        <span className="info-label">{contact.system}</span>
                                        <span className="info-value">{contact.value} ({contact.use})</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );

    const renderEncountersTab = () => (
        <div className="section-block">
            <h3 className="section-block-title">Patient Encounters</h3>
            <EncountersList
                encounters={encounters}
                patientId={patient._id}
                onEncounterCreated={(newEncounter) => {
                    setEncounters(prev => [...prev, newEncounter]);
                }}
            />
        </div>
    );

    const renderObservationsTab = () => (
        <div className="section-block">
            <h3 className="section-block-title">All Observations</h3>
            <ObservationsList
                observations={observations}
                patientId={patient._id}  // Make sure to pass patientId here
            />
        </div>
    );

    return (
        <div className="patient-detail">
            <div className="detail-header">
                <div>
                    <h2 className="detail-title">Patient Details</h2>
                    <div className="button-group">
                        {userRole === 'doctor' && (
                            <button onClick={sendPatientToFhir} className="fhir-button">
                                Send to FHIR
                            </button>
                        )}
                        {!isEditing ? (
                            <button onClick={handleEdit} className="edit-button">
                                Edit Patient
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className="save-button">
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
                {patient.photo && (
                    <img src={patient.photo} alt={`${patient.name}'s photo`} className="patient-photo" />
                )}
            </div>

            <div className="tabs-container">
                {renderTabButtons()}
                <div className="tab-content">
                    {activeTab === 'overall' && renderOverallTab()}
                    {userRole === 'doctor' && (
                        <>
                            {activeTab === 'encounters' && renderEncountersTab()}
                            {activeTab === 'observations' && renderObservationsTab()}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientDetail;