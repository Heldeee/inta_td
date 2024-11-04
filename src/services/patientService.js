import axios from 'axios';
import { getKeycloakInstance } from './keycloakService';

const API_URL = 'http://localhost:8080/api/patients';

export const getPatient = async (patientId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(`${API_URL}/${patientId}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting patient:', error);
        throw error;
    }
};