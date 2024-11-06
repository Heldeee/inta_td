import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKeycloakInstance, isAuthenticated, getUserRoles, logout } from '../services/keycloakService';
import PatientInfo from './PatientInfo';
import MedicalRecordsList from './MedicalRecordsList';
import AlertsList from './AlertsList';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [alerts, setAlerts] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Vérifier l'authentification
        if (!isAuthenticated()) {
            navigate('/login');
            return;
        }

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const roles = getUserRoles();
                setUserRole(roles[0]); // Prend le premier rôle comme rôle principal

                // Simulons la récupération des données (à remplacer par vos appels API réels)
                // Différentes données selon le rôle
                if (roles.includes('doctor')) {
                    // Données pour les médecins
                    setPatient({
                        id: 1,
                        name: "John Doe",
                        age: 45,
                        lastVisit: "2024-03-15"
                    });
                    setMedicalRecords([
                        { id: 1, date: "2024-03-15", type: "Consultation", description: "Contrôle tension" },
                        { id: 2, date: "2024-02-15", type: "ECG", description: "ECG de routine" }
                    ]);
                    setAlerts([
                        { id: 1, severity: "high", message: "Tension élevée détectée", timestamp: "2024-03-16T10:30:00" }
                    ]);
                } else if (roles.includes('secretary')) {
                    // Données limitées pour le secrétariat
                    setPatient({
                        id: 1,
                        name: "John Doe",
                        age: 45
                    });
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
        return <div>Chargement...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
            }}>
                <h1>Tableau de bord - {userRole === 'doctor' ? 'Médecin' : 'Secrétariat'}</h1>
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
                    Déconnexion
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <PatientInfo patient={patient} />
                </div>

                <div style={{
                    padding: '20px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    <MedicalRecordsList records={medicalRecords} />
                </div>

                {userRole === 'doctor' && (
                    <div style={{
                        gridColumn: '1 / -1',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <AlertsList alerts={alerts} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;