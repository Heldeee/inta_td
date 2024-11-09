import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRoles, logout } from '../services/keycloakService';
import PatientInfo from './PatientInfo';
import MedicalRecordsList from './MedicalRecordsList';
import AlertsList from './AlertsList';
import DeviceStatusPanel from './DeviceStatusPanel'; // New Component
import PatientList from './PatientList'; // New Component for secretary view

const DashboardPage = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const roles = getUserRoles();
                if (!roles.length) {
                    navigate('/unauthorized');
                    return;
                }
                setUserRole(roles);

                console.log('User roles:', roles);

                // Simulate data fetching based on roles
                if (roles.includes('doctor')) {
                    // Doctor-specific data
                    setPatient({ id: 1, name: "John Doe", age: 45, lastVisit: "2024-03-15" });
                    setMedicalRecords([
                        { id: 1, date: "2024-03-15", type: "Consultation", description: "Routine check-up" },
                        { id: 2, date: "2024-02-15", type: "ECG", description: "Routine ECG" }
                    ]);
                    setAlerts([{ id: 1, severity: "high", message: "High blood pressure detected", timestamp: "2024-03-16T10:30:00" }]);
                } else if (roles.includes('secretary')) {
                    // Secretary-specific data
                    setPatient({ id: 1, name: "John Doe", age: 45 });
                    setMedicalRecords([
                        { id: 1, date: "2024-03-15", type: "Consultation" },
                        { id: 2, date: "2024-02-15", type: "ECG" }
                    ]);
                }

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
        return <div>Loading...</div>;
    }

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            <aside style={{ width: '20%', padding: '20px', borderRight: '1px solid #ddd' }}>
                <h2>Navigation</h2>
                <button onClick={handleLogout} style={{ backgroundColor: 'lightcoral' }}>Logout</button>
                <div>User Role: {userRole.join(', ')}</div>
            </aside>

            <main style={{ width: '80%', padding: '20px' }}>
                <h1>Dashboard - {userRole.includes('doctor') ? 'Doctor' : 'Secretary'}</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                        <PatientInfo patient={patient} />
                    </div>

                    <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                        <MedicalRecordsList records={medicalRecords} />
                    </div>

                    {userRole.includes('doctor') && (
                        <>
                            <div style={{ gridColumn: '1 / -1', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                                <AlertsList alerts={alerts} />
                            </div>
                            <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                                <DeviceStatusPanel />
                            </div>
                        </>
                    )}

                    {userRole.includes('secretary') && (
                        <div style={{ gridColumn: '1 / -1', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
                            <PatientList />
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;