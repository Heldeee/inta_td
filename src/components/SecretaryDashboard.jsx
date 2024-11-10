import React from 'react';
import PatientInfo from './PatientInfo';

const SecretaryDashboard = ({ patient }) => (
    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <PatientInfo patient={patient} />
    </div>
);

export default SecretaryDashboard;