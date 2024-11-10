import React from 'react';
import MedicalRecordsList from './MedicalRecordsList';
import AlertsList from './AlertsList';

const DoctorDashboard = ({ patient, medicalRecords, alerts }) => (
    <div>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <MedicalRecordsList records={medicalRecords} />
        </div>
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <AlertsList alerts={alerts} />
        </div>
    </div>
);

export default DoctorDashboard;