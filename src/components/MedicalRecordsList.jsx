import React, { useState, useEffect } from 'react';
import { getMedicalRecords } from '../services/medicalRecordService';

const MedicalRecordsList = ({ patientId }) => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            try {
                const data = await getMedicalRecords(patientId);
                setRecords(data);
            } catch (error) {
                console.error('Error fetching medical records:', error);
            }
        };

        if (patientId) {
            fetchMedicalRecords();
        }
    }, [patientId]);

    if (!records || records.length === 0) {
        return <div>No medical records found.</div>;
    }

    return (
        <div>
            <h2>Medical Records</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Blood Pressure</th>
                        <th>Heart Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record, index) => (
                        <tr key={index}>
                            <td>{new Date(record.timestamp).toLocaleString()}</td>
                            <td>{record.bloodPressure.systolic}/{record.bloodPressure.diastolic}</td>
                            <td>{record.heartRate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MedicalRecordsList;