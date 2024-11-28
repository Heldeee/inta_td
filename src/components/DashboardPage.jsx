import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getKeycloakInstance,
    isAuthenticated,
    getUserRoles,
    logout,
    getToken,
} from '../services/keycloakService';
import { Users, FileText, Stethoscope, LogOut, PlusCircle, Loader } from 'lucide-react';

import PatientInfo from './PatientInfo';
import PatientDetail from './PatientDetail';
import AlertsList from './AlertsList';
import TransferPatientForm from './TransferPatientForm';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [isTransferPatientModalOpen, setIsTransferPatientModalOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const roles = getUserRoles();
                setUserRole(roles[0]);
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
        navigate('/login');
    };

    const handleAddPatient = () => {
        navigate('/add-patient');
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <Loader className="loading-spinner" size={48} />
                <span className="loading-text">Loading...</span>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Left Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-title">
                        <Users className="sidebar-icon" /> Patients
                    </h2>
                    <button
                        onClick={handleAddPatient}
                        className="add-button"
                    >
                        <PlusCircle size={20} />
                    </button>
                </div>
                <div className="sidebar-content">
                    <PatientInfo
                        onSelectPatient={(patient) => {
                            setSelectedPatient(patient);
                        }}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <div className="header">
                    <h1 className="header-title">
                        Dashboard - {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        <LogOut className="logout-icon" /> Logout
                    </button>
                </div>

                {/* Content Area */}
                <div className="content-area">
                    {selectedPatient ? (
                        <div className="patient-detail-container">
                            <PatientDetail
                                patient={selectedPatient}
                                onTransferPatient={() => setIsTransferPatientModalOpen(true)}
                            />
                            {userRole === 'doctor' && (
                                <div className="alerts-section">
                                    <h3 className="alerts-title">Alerts</h3>
                                    <AlertsList
                                        alerts={alerts}
                                        selectedPatient={selectedPatient}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="no-patient-selected">
                            <Stethoscope size={64} className="no-patient-icon" />
                            <p className="no-patient-text">Select a patient to view details</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {isTransferPatientModalOpen && (
                <TransferPatientForm
                    patient={selectedPatient}
                    onClose={() => setIsTransferPatientModalOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardPage;
