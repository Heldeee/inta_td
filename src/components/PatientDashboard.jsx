import React from 'react';
import MedicalRecordsList from './MedicalRecordsList';

const PatientDashboard = ({ medicalRecords }) => (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <MedicalRecordsList records={medicalRecords} />
    </div>
);

export default PatientDashboard;