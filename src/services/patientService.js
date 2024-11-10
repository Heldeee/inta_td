import axios from 'axios';
import { getKeycloakInstance } from './keycloakService';

const API_URL = 'http://localhost:5000/api/patients';

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

export const createPatient = async (patient) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.post(API_URL, patient, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
}