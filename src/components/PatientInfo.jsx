import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientsInfo = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [devices, setDevices] = useState({}); // State to store devices by patient_id

    // Fetch patients once when component mounts
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/patients');
                setPatients(response.data);
                setFilteredPatients(response.data); // Initially show all patients
                setLoading(false);
            } catch (error) {
                setError('Error fetching patients data');
                setLoading(false);
            }
        };

        fetchPatients();
    }, []); // Empty dependency array so it runs only once when the component mounts

    // Fetch devices once when patients are fetched
    useEffect(() => {
        const fetchPatientDevices = async () => {
            const devicesData = {};
            for (const patient of patients) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/devices/${patient._id}`);
                    devicesData[patient._id] = response.data;
                } catch (error) {
                    console.error(`Error fetching devices for patient ${patient._id}:`, error);
                    devicesData[patient._id] = [];
                }
            }
            setDevices(devicesData); // Store devices data for each patient
        };

        if (patients.length > 0) { // Fetch devices only when patients are fetched
            fetchPatientDevices();
        }
    }, [patients]); // Dependency array contains patients, so it runs when patients data is set

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const results = patients.filter(patient =>
            patient.name.toLowerCase().includes(query)
        );
        setFilteredPatients(results);
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
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PatientsInfo;
