import React from 'react';
import { login, isAuthenticated } from '../services/keycloakService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isAuthenticated()) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5'
        }}>
            <div style={{
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ marginBottom: '1.5rem', color: '#333' }}>
                    Cabinet Médical Login
                </h1>
                <button
                    onClick={handleLogin}
                    style={{
                        padding: '0.75rem 1.5rem',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Se connecter avec Keycloak
                </button>
            </div>
        </div>
    );
};

export default LoginPage;