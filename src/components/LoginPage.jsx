import React from 'react';
import { login, isAuthenticated } from '../services/keycloakService';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/cabinet.jpeg';

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
        <>
            <style>
                {`
                    body {
                        margin: 0;
                        overflow: hidden;
                        font-family: 'Inter', sans-serif;
                    }
                `}
            </style>
            <div style={{
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
            }}>
                <div style={{
                    padding: '3rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(8px)',
                    maxWidth: '400px',
                    width: '90%',
                }}>
                    <h1 style={{
                        marginBottom: '2rem',
                        color: '#2d3748',
                        fontSize: '2.25rem',
                        textAlign: 'center',
                        fontWeight: '600',
                        letterSpacing: '-0.025em'
                    }}>
                        Medical Cabinet
                    </h1>
                    <p style={{
                        marginBottom: '2rem',
                        color: '#4a5568',
                        textAlign: 'center',
                        fontSize: '1.125rem',
                        lineHeight: '1.75',
                        fontWeight: '400'
                    }}>
                        Please login to access your medical dashboard
                    </p>
                    <button
                        onClick={handleLogin}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: '#4299e1',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 4px rgba(66, 153, 225, 0.3)',
                            letterSpacing: '0.025em'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#3182ce'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#4299e1'}
                    >
                        Connect with Keycloak
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoginPage;