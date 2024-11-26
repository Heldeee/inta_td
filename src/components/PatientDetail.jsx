import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDetail = ({ patient }) => {
    const [cabinet, setCabinet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const sendPatientToFhir = async () => {
        try {
            console.log(patient.idNos);
            const response = await axios.post(`http://localhost:5000/api/patients/transfer`, {}, { headers: { id: patient._id } });
            alert('Patient data sent to FHIR server successfully');
        } catch (error) {
            console.error('Error sending patient data to FHIR server:', error);
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Patient Details</h2>
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
            <p>Name: {patient.name}</p>
            <p>Date of Birth: {prettyDate(patient.dateOfBirth)}</p>
            <p>Gender: {patient.gender}</p>
            <p>ID Number: {patient.keycloakId}</p>
            {cabinet && (
                <>
                    <h4>Cabinet Information</h4>
                    <p>Name: {cabinet.name}</p>
                    <p>Address: {cabinet.address}</p>
                    <p>Phone: {cabinet.phone}</p>
                </>
            )}
        </div>
    );
};

export default PatientDetail;