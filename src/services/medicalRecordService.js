import axios from 'axios';
import { getKeycloakInstance } from './keycloakService';

const API_URL = 'http://localhost:8080/api/medical-records';

export const getMedicalRecords = async (patientId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(`${API_URL}?patientId=${patientId}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting medical records:', error);
        throw error;
    }
};

export const createMedicalRecord = async (patientId, record) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.post(`${API_URL}?patientId=${patientId}`, record, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating medical record:', error);
        throw error;
    }
};