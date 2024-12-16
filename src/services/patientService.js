import axios from 'axios';
import { getKeycloakInstance } from './keycloakService';

const BASE_URL = 'http://localhost:5000/api';

export const getAllPatients = async () => {
    const keycloak = getKeycloakInstance();
    const response = await axios.get(`${BASE_URL}/patients`, {
        headers: {
            Authorization: `Bearer ${keycloak.token}`,
        },
    });
    return response.data;
};

export const getPatient = async (id) => {
    const keycloak = getKeycloakInstance();
    const response = await axios.get(`${BASE_URL}/patients/${id}`, {
        headers: {
            Authorization: `Bearer ${keycloak.token}`,
        },
    });
    return response.data;
};

export const createPatient = async (patientData) => {
    const response = await axios.post(`${BASE_URL}/patients`, patientData);
    return response.data;
};

export const updatePatient = async (id, patientData) => {
    const response = await axios.put(`${BASE_URL}/patients/${id}`, patientData);
    return response.data;
};

export const transferToFHIR = async (id) => {
    const response = await axios.post(`${BASE_URL}/patients/${id}/fhir`);
    return response.data;
};

export const getPatientEncounters = async (patientId) => {
    const response = await axios.get(`${BASE_URL}/patients/${patientId}/encounters`);
    return response.data;
};

export const getPatientObservations = async (patientId) => {
    const response = await axios.get(`${BASE_URL}/patients/${patientId}/observations`);
    return response.data;
};