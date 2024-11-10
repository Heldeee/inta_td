import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientsInfo = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all patients from the backend
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/patients'); // Change the URL as needed
                setPatients(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching patients data');
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    if (loading) {
        return <div>Loading patients...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Patients List</h2>
            {patients.length === 0 ? (
                <p>No patients found.</p>
            ) : (
                <ul>
                    {patients.map((patient) => (
                        <li key={patient.idNos}>
                            <h3>Patient Information</h3>
                            <p>Name: {patient.name}</p>
                            <p>Date of Birth: {patient.dateOfBirth}</p>
                            <h4>Connected Devices</h4>
                            {patient.medicalDevices && patient.medicalDevices.length > 0 ? (
                                <ul>
                                    {patient.medicalDevices.map((device) => (
                                        <li key={device.id}>
                                            {device.type} - ID: {device.id}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No devices connected.</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PatientsInfo;
