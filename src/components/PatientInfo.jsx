import React, { useState, useEffect } from 'react';
import { getAllPatients } from '../services/patientService';
import { getCabinet } from '../services/cabinetService';
import { Search, User } from 'lucide-react';
import '../styles/PatientInfo.css';

const PatientsInfo = ({ onSelectPatient, selectedPatient, onPatientCount }) => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddPatientForm, setShowAddPatientForm] = useState(false);
    const [cabinets, setCabinets] = useState({});

    const prettyDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await getAllPatients();
                setPatients(data);
                setFilteredPatients(data);
                onPatientCount(data.length);
                setLoading(false);
            } catch (error) {
                setError('Error fetching patients data');
                setLoading(false);
            }
        };

        fetchPatients();
    }, [onPatientCount]);

    useEffect(() => {
        const getPatientCabinet = async () => {
            const cabinetData = {};
            for (const patient of patients) {
                try {
                    const data = await getCabinet(patient.cabinetId);
                    cabinetData[patient._id] = data;
                } catch (error) {
                    console.error(`Error fetching cabinet for patient ${patient._id}:`, error);
                }
            }
            setCabinets(cabinetData);
        };

        if (patients.length > 0) {
            getPatientCabinet();
        }
    }, [patients]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const results = patients.filter(patient =>
            patient.name.toLowerCase().includes(query)
        );
        setFilteredPatients(results);
    };

    const handleAddPatient = (newPatient) => {
        setPatients((prevPatients) => [...prevPatients, newPatient]);
        setFilteredPatients((prevPatients) => [...prevPatients, newPatient]);
    };

    if (loading) {
        return <div>Loading patients...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="patient-list-container">
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {filteredPatients.length === 0 ? (
                <div className="no-results">
                    <p>No patients found</p>
                </div>
            ) : (
                <div className="patients-list">
                    {filteredPatients.map((patient) => (
                        <div
                            key={patient._id}
                            className={`patient-card ${selectedPatient && selectedPatient._id === patient._id ? 'selected' : ''}`}
                            onClick={() => onSelectPatient(patient)}
                        >
                            <div className="patient-name">
                                {patient.name}
                            </div>
                            <div className="patient-info">
                                <span>{prettyDate(patient.dateOfBirth)}</span>
                                {cabinets[patient._id] && (
                                    <span className="cabinet-tag">
                                        {cabinets[patient._id].name}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PatientsInfo;