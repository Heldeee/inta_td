import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getKeycloakInstance,
    isAuthenticated,
    getUserRoles,
    logout,
    getToken,
    getUserInfo,
} from '../services/keycloakService';
import { Users, FileText, Stethoscope, LogOut, PlusCircle, Loader, Upload } from 'lucide-react';

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
    const [userInfo, setUserInfo] = useState(null);
    const [patientCount, setPatientCount] = useState(0);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const roles = getUserRoles();
                const userDetails = getUserInfo();
                setUserRole(roles[0]);
                setUserInfo(userDetails);
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

    const handlePatientCount = (count) => {
        setPatientCount(count);
    };

    if (loading) {
        return (
            <div className="modern-loading-screen">
                <div className="loading-content">
                    <Loader className="loading-spinner" size={64} />
                    <h2 className="loading-title">Starting up services...</h2>
                    <p className="loading-message">Please wait while Docker containers are launching.</p>
                    <p className="loading-instruction">If this takes too long, try refreshing the page (F5)</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Left Sidebar */}
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2 className="sidebar-title">
                        <Users size={24} />
                        Patients
                        <span className="patient-count">{patientCount}</span>
                    </h2>
                    <div className="action-buttons">
                        <button
                            onClick={handleAddPatient}
                            className="action-button primary"
                            title="Add new patient"
                        >
                            <PlusCircle size={18} />
                            Add Patient
                        </button>
                    </div>
                </div>
                <div className="sidebar-content">
                    <PatientInfo
                        onSelectPatient={(patient) => {
                            setSelectedPatient(patient);
                        }}
                        selectedPatient={selectedPatient}
                        onPatientCount={handlePatientCount}
                        userInfo={userInfo}  // Add this line
                        userRole={userRole}  // Add this line
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Header */}
                <div className="header">
                    <div className="header-content">
                        <h1 className="header-title">Medical Dashboard</h1>
                        {userInfo && (
                            <div className="user-info">
                                <span className="user-name">
                                    {userInfo.given_name} {userInfo.family_name}
                                </span>
                                <span className="user-role">{userRole}</span>
                            </div>
                        )}
                    </div>
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
                                userRole={userRole}
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
        </div>
    );
};

export default DashboardPage;