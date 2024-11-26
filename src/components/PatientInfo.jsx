import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPatientForm from './AddPatientForm';

const PatientsInfo = ({ onSelectPatient }) => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [showAddPatientForm, setShowAddPatientForm] = useState(false);
    const [cabinets, setCabinets] = useState({});

    const prettyDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/patients');
                setPatients(response.data);
                setFilteredPatients(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching patients data');
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
        const getPatientCabinet = async () => {
            const cabinetData = {};
            for (const patient of patients) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/cabinets/${patient.cabinetId}`);
                    cabinetData[patient._id] = response.data;
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
        <div>
            <h2>Patients List</h2>
            <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearch}
                style={{
                    marginBottom: '10px',
                    padding: '8px',
                    width: '100%',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />
            <button onClick={() => setShowAddPatientForm(true)}>Add Patient</button>
            {showAddPatientForm && (
                <AddPatientForm onClose={() => setShowAddPatientForm(false)} onAddPatient={handleAddPatient} />
            )}
            {filteredPatients.length === 0 ? (
                <p>No patients found.</p>
            ) : (
                <div style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '10px'
                }}>
                    <ul>
                        {filteredPatients.map((patient) => (
                            <li key={patient._id} style={{
                                borderBottom: '1px solid #eee',
                                paddingBottom: '10px',
                                marginBottom: '10px',
                                cursor: 'pointer',
                                backgroundColor: selectedPatient && selectedPatient._id === patient._id ? '#f0f0f0' : 'transparent'
                            }} onClick={() => onSelectPatient(patient)}>
                                <h3>{patient.name}</h3>
                                <p>Date of Birth: {prettyDate(patient.dateOfBirth)}</p>
                                {cabinets[patient._id] && (
                                    <p>Cabinet: {cabinets[patient._id].name}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PatientsInfo;