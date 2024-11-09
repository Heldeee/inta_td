import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        // Optionally, navigate back to the login page or any other page
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Accès refusé</h1>
            <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
            <button
                onClick={handleGoBack}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Retour à la page de connexion
            </button>
        </div>
    );
};

export default UnauthorizedPage;
