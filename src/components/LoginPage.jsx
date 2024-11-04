import React from 'react';
import Keycloak from 'keycloak-js';

const keycloak = Keycloak('/keycloak.json');

const LoginPage = () => {
    const login = async () => {
        try {
            await keycloak.init({ onLoad: 'login-required' });
            await keycloak.login();
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={login}>Login with Keycloak</button>
        </div>
    );
};

export default LoginPage;