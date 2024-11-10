// patientService.js
import axios from 'axios';
import { getKeycloakInstance } from './keycloakService';

const API_URL = 'http://localhost:3000/api/patients';

// Retrieve details for a single patient
export const getPatient = async (patientId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(`${API_URL}/${patientId}`, {
            headers: { Authorization: `Bearer ${keycloak.token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting patient:', error);
        throw error;
    }
};

// Create a new patient
export const createPatient = async (patientData) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.post(API_URL, patientData, {
            headers: { Authorization: `Bearer ${keycloak.token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};

// Retrieve a list of all patients
export const getPatients = async () => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${keycloak.token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting patients:', error);
        throw error;
    }
};

// Update an existing patient
export const updatePatient = async (patientId, patientData) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.put(`${API_URL}/${patientId}`, patientData, {
            headers: { Authorization: `Bearer ${keycloak.token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};

// Delete a patient (optional, depending on your needs)
export const deletePatient = async (patientId) => {
    try {
        const keycloak = getKeycloakInstance();
        await axios.delete(`${API_URL}/${patientId}`, {
            headers: { Authorization: `Bearer ${keycloak.token}` },
        });
    } catch (error) {
        console.error('Error deleting patient:', error);
        throw error;
    }
};
