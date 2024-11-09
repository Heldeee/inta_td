import React from 'react';

const PatientInfo = ({ patient }) => {
    if (!patient) {
        return <div>Loading patient information...</div>;
    }

    return (
        <div>
            <h2>Patient Information</h2>
            <p>Name: {patient.name}</p>
            <p>Date of Birth: {patient.dateOfBirth}</p>
            <h3>Connected Devices</h3>
            <ul>
                {patient.medicalDevices && patient.medicalDevices.length > 0 ? (
                    patient.medicalDevices.map((device) => (
                        <li key={device.id}>{device.type} - ID: {device.id}</li>
                    ))
                ) : (
                    <li>No connected devices found.</li>
                )}
            </ul>
        </div>
    );
};

export default PatientInfo;
