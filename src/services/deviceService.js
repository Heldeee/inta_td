import axios from 'axios';
import { getKeycloakInstance } from './keycloakService';

const API_URL = 'http://localhost:5000/api/devices';

export const getDevices = async (patientId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.get(`${API_URL}?patientId=${patientId}`, {
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

export const connectDevice = async (patientId, deviceId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.post(`${API_URL}/connect`, { patientId, deviceId }, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error connecting device:', error);
        throw error;
    }
};

export const disconnectDevice = async (patientId, deviceId) => {
    try {
        const keycloak = getKeycloakInstance();
        const response = await axios.post(`${API_URL}/disconnect`, { patientId, deviceId }, {
            headers: {
                Authorization: `Bearer ${keycloak.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error disconnecting device:', error);
        throw error;
    }
};