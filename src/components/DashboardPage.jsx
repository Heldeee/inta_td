import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getKeycloakInstance,
    isAuthenticated,
    getUserRoles,
    logout,
    getToken
} from '../services/keycloakService';
import PatientInfo from './PatientInfo';
import MedicalRecordsList from './MedicalRecordsList';
import AlertsList from './AlertsList';
import AddPatientForm from './AddPatientForm';
import AddDeviceForm from './AddDeviceForm';
import TransferPatientForm from './TransferPatientForm';
import PatientDashboard from './PatientDashboard';
import PatientDetail from './PatientDetail';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
    const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
    const [isTransferPatientModalOpen, setIsTransferPatientModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    const openTransferPatientModal = () => setIsTransferPatientModalOpen(true);
    const closeTransferPatientModal = () => setIsTransferPatientModalOpen(false);

    const closeAddPatientModal = () => setIsAddPatientModalOpen(false);

    const openAddDeviceModal = () => setIsAddDeviceModalOpen(true);
    const closeAddDeviceModal = () => setIsAddDeviceModalOpen(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const roles = getUserRoles();
                const token = getToken();
                setUserRole(roles[0]);
                console.log(roles);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (userRole === 'patient') {
        return <PatientDashboard />;
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h1>Dashboard - {userRole === 'doctor' ? 'Doctor' : 'Secretary'}</h1>
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
                    Logout
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                {selectedPatient && (
                    <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}>
                        <PatientDetail patient={selectedPatient} />
                    </div>
                )}
                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <PatientInfo onSelectPatient={setSelectedPatient} />
                    <button
                        onClick={() => setIsAddPatientModalOpen(true)}
                        style={{
                            padding: '10px',
                            backgroundColor: '#007BFF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            alignSelf: 'flex-end'
                        }}
                    >
                        Add Patient
                    </button>
                    {isAddPatientModalOpen && <AddPatientForm onClose={closeAddPatientModal} />}
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <MedicalRecordsList records={medicalRecords} />
                    {userRole === 'doctor' && (
                        <AlertsList alerts={alerts} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;