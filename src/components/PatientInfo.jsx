import React, { useState, useEffect } from 'react';
import { getAllPatients } from '../services/patientService';
import { getCabinet } from '../services/cabinetService';
import axios from 'axios';
import '../styles/PatientInfo.css';

const PatientsInfo = ({ onSelectPatient, selectedPatient, onPatientCount, userInfo, userRole }) => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [cabinets, setCabinets] = useState({});

    const prettyDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    useEffect(() => {
        const fetchDoctorAndPatients = async () => {
            try {
                const data = await getAllPatients();
                let filteredData = data;

                if (userRole === 'doctor' && userInfo?.preferred_username) {
                    // Get professional info using Keycloak username
                    const professionalResponse = await axios.get(`http://localhost:5000/api/professionals/keycloak/${userInfo.preferred_username}`);
                    const professional = professionalResponse.data;

                    // Filter patients by cabinet ID
                    if (professional?.cabinetId) {
                        filteredData = data.filter(patient => patient.cabinetId === professional.cabinetId);
                    }
                }

                setPatients(filteredData);
                setFilteredPatients(filteredData);
                onPatientCount(filteredData.length);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchDoctorAndPatients();
    }, [onPatientCount, userInfo, userRole]);

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