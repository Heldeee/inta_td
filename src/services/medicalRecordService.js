import axios from 'axios';
import { getKeycloakInstance } from './keycloakService';

const BASE_URL = 'http://localhost:5000/api';
const MEDICAL_RECORDS_URL = `${BASE_URL}/medical-records`;
const DEVICES_URL = `${BASE_URL}/devices`;

export const getMedicalRecords = async (patientId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(`${MEDICAL_RECORDS_URL}?patientId=${patientId}`, {
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
        const response = await axios.post(`${MEDICAL_RECORDS_URL}?patientId=${patientId}`, record, {
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

export const getDevices = async () => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(DEVICES_URL, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting devices:', error);
        throw error;
    }
};

export const getDevice = async (deviceId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(`${DEVICES_URL}/${deviceId}`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting device:', error);
        throw error;
    }
};

export const getDeviceRecords = async (deviceId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(`${DEVICES_URL}/${deviceId}/records`, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error getting device records:', error);
        throw error;
    }
};