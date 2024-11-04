import Keycloak from 'keycloak-js';

const keycloak = Keycloak('/keycloak.json');

export const initKeycloak = async () => {
    try {
        await keycloak.init({ onLoad: 'check-sso' });
        return keycloak;
    } catch (error) {
        console.error('Error initializing Keycloak:', error);
        throw error;
    }
};

export const getKeycloakInstance = () => {
    return keycloak;
};