// PatientDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getToken, logout, getUserInfo } from '../services/keycloakService';

const PatientDashboard = () => {
    const [medicalInfo, setMedicalInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMedicalInfo = async () => {
            try {
                const token = getToken();
                const decodedToken = jwtDecode(token);
                const userInfo = getUserInfo();
                const userName = userInfo.preferred_username;
                const response = await axios.get(`http://localhost:5000/api/patients/keycloak/${userName}`);
                setMedicalInfo(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching medical info:', error);
                setLoading(false);
            }
        };

        fetchMedicalInfo();
    }, []);

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Patient Dashboard</h1>
            {medicalInfo ? (
                <div>
                    <h2>Medical Information</h2>
                    <p>{medicalInfo.dateOfBirth}</p>
                    <p>{medicalInfo.name}</p>
                    <h3>Medical Devices</h3>
                    <ul>
                        {medicalInfo.medicalDevices.map((device) => (
                            <li key={device.id}>
                                {device.type} - {device.id}
                            </li>
                        ))}
                    </ul>
                    <h3>Medical Records</h3>
                    <ul>
                        {medicalInfo.medicalRecords.map((record) => (
                            <li key={record._id}>{record.date}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No medical information available.</p>
            )}
            <button
                onClick={handleLogout}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Déconnexion
            </button>
        </div>

    );
};

export default PatientDashboard;