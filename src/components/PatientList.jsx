// PatientList.jsx
import React, { useEffect, useState } from 'react';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        // Simulate fetching data from an API
        const fetchPatientData = async () => {
            const simulatedData = [
                { id: 1, name: "John Doe", age: 45, lastVisit: "2024-03-15" },
                { id: 2, name: "Jane Smith", age: 50, lastVisit: "2024-02-10" },
                { id: 3, name: "Emily Johnson", age: 32, lastVisit: "2024-01-25" },
            ];
            setPatients(simulatedData);
        };

        fetchPatientData();
    }, []);

    return (
        <div>
            <h2>Patient List</h2>
            {patients.length === 0 ? (
                <p>No patients found.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {patients.map(patient => (
                        <li key={patient.id} style={{
                            padding: '10px', marginBottom: '10px', borderRadius: '4px',
                            backgroundColor: '#f0f0f0'
                        }}>
                            <strong>{patient.name}</strong>, {patient.age} years old
                            <div style={{ fontSize: '0.8em', color: '#555' }}>Last visit: {patient.lastVisit}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PatientList;
