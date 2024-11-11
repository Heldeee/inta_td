import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:8180',
    realm: 'medical-cabinet',
    clientId: 'medical-frontend'
};

const keycloakInstance = new Keycloak(keycloakConfig);

export const initKeycloak = async () => {
    try {
        const authenticated = await keycloakInstance.init({
            onLoad: 'check-sso',
            silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
            pkceMethod: 'S256'
        });

        console.log('Keycloak initialized:', authenticated ? 'Authenticated' : 'Not authenticated');
        return authenticated;
    } catch (error) {
        console.error('Error initializing Keycloak:', error);
        throw error;
    }
};

export const getKeycloakInstance = () => {
    return keycloakInstance;
};

// Fonctions utilitaires pour la gestion de l'authentification
export const login = () => keycloakInstance.login();
export const logout = () => keycloakInstance.logout();
export const isAuthenticated = () => keycloakInstance.authenticated;
export const getToken = () => keycloakInstance.token;
export const getUserRoles = () => keycloakInstance.tokenParsed?.realm_access?.roles || [];
export const getUserInfo = () => keycloakInstance.tokenParsed;