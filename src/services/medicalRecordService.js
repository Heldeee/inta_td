// medicalRecordService.js
import axios from 'axios';
import { getKeycloakInstance } from './keycloakService';

const API_URL = 'http://localhost:8080/api/medical-records';

// Retrieve all medical records for a given patient
export const getMedicalRecords = async (patientId) => {
    try {
        const token = await getToken();
        const response = await axios.get(`${API_URL}?patientId=${patientId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting medical records:', error);
        throw error;
    }
};

// Create a new medical record for a patient
export const createMedicalRecord = async (patientId, record) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.post(`${API_URL}?patientId=${patientId}`, record, {
            headers: { Authorization: `Bearer ${keycloak.token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating medical record:', error);
        throw error;
    }
};

// Retrieve details of a single medical record (optional if detailed viewing is needed)
export const getMedicalRecord = async (recordId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(`${API_URL}/${recordId}`, {
            headers: { Authorization: `Bearer ${keycloak.token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting medical record:', error);
        throw error;
    }
};
