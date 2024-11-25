import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientDetail = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/patients/${id}`);
                setPatient(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching patient data');
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    const sendPatientToFhir = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/patients/fhir`, { id });
            alert('Patient data sent to FHIR server successfully');
        } catch (error) {
            console.error('Error sending patient data to FHIR server:', error);
            alert('Error sending patient data to FHIR server');
        }
    };

    if (loading) {
        return <div>Loading patient details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Patient Details</h2>
            <p>Name: {patient.name}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <p>Gender: {patient.gender}</p>
            <p>ID Number: {patient.keycloakId}</p>
            <h4>Cabinet Information</h4>
            <p>Name: {patient.cabinet.name}</p>
            <p>Address: {patient.cabinet.address}</p>
            <p>Phone: {patient.cabinet.phone}</p>
            <button onClick={sendPatientToFhir} style={{
                padding: '10px 20px',
                backgroundColor: '#007BFF',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}>
                Send to FHIR
            </button>
        </div>
    );
};

export default PatientDetail;