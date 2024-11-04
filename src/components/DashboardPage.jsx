import React, { useState, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import PatientInfo from './PatientInfo';
import MedicalRecordsList from './MedicalRecordsList';
import AlertsList from './AlertsList';

const keycloak = Keycloak('/keycloak.json');

const DashboardPage = () => {
    const [patient, setPatient] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const initKeycloak = async () => {
            try {
                await keycloak.init({ onLoad: 'check-sso' });
                // Récupérer les informations du patient, les dossiers médicaux et les alertes
                setPatient(/* données du patient */);
                setMedicalRecords(/* données des dossiers médicaux */);
                setAlerts(/* données des alertes */);
            } catch (error) {
                console.error('Error initializing Keycloak:', error);
            }
        };
        initKeycloak();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <PatientInfo patient={patient} />
            <MedicalRecordsList records={medicalRecords} />
            <AlertsList alerts={alerts} />
        </div>
    );
};

export default DashboardPage;