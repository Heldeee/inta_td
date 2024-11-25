import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import AddPatientForm from './AddPatientForm';

const PatientsInfo = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [devices, setDevices] = useState({});
    const [showAddPatientForm, setShowAddPatientForm] = useState(false);
    const [cabinets, setCabinets] = useState({});
    const history = useHistory();

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
                                marginBottom: '10px'
                            }}>
                                <h3>Patient Information</h3>
                                <p>Name: {patient.name}</p>
                                <p>Date of Birth: {patient.dateOfBirth}</p>
                                <p>ID Number: {patient.keycloakId}</p>
                                {cabinets[patient._id] && (
                                    <>
                                        <h4>Cabinet Information</h4>
                                        <p>Name: {cabinets[patient._id].name}</p>
                                        <p>Address: {cabinets[patient._id].address}</p>
                                        <p>Phone: {cabinets[patient._id].phone}</p>
                                    </>
                                )}
                                <h4>Connected Devices</h4>
                                {devices[patient._id] && devices[patient._id].length > 0 ? (
                                    <ul>
                                        {devices[patient._id].map((device) => (
                                            <li key={device._id}>
                                                Medical Device - Device ID: {device._id}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No devices connected.</p>
                                )}
                                <button onClick={() => history.push(`/patient/${patient._id}`)}>View Details</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PatientsInfo;