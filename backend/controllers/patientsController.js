import Patient from '../models/Patient.js';
import axios from 'axios';

// Get patient data by ID
export const getPatientInfo = async (req, res) => {
    try {
        const patient = await Patient.findOne({ idNos: req.params.id });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(patient);
    } catch (error) {
        console.error('Error fetching patient data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get list of all patients
export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients list:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Create new patient
export const createPatient = async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all patient data by doctor ID
export const getPatientsByDoctor = async (req, res) => {
    try {
        const patients = await Patient.find({ doctorId: req.params.doctorId });
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients by doctor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get patient data by keycloak ID
export const getPatientByKeycloakId = async (req, res) => {
    try {
        const patient = await Patient.findOne({ keycloakId: req.params.keycloakId });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.json(patient);
    }
    catch (error) {
        console.error('Error fetching patient data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Send patient data to FHIR server
export const sendPatientToFhir = async (req, res) => {
    try {
        const patient = await Patient.findOne({ _id: req.headers.id });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const fhirServerUrl = "https://hapi.fhir.org/baseR4/";
        const patientInfo = {
            resourceType: "Patient",
            id: patient._id,
            name: [{ use: "official", family: patient.name.split(' ')[1], given: [patient.name.split(' ')[0]] }],
            gender: patient.gender,
            birthDate: patient.dateOfBirth.toISOString().split('T')[0]
        };

        const response = await axios.post(fhirServerUrl + "Patient", patientInfo, {
            headers: { 'Content-Type': 'application/fhir+json' }
        });

        if (response.status === 201) {
            res.json({ message: 'Patient data sent to FHIR server successfully', resourceId: response.headers.location });
        } else {
            res.status(response.status).json({ error: 'HERE Error sending data to FHIR server', details: response.data });
        }
    } catch (error) {
        console.error('Error sending patient data to FHIR server:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const printMiddleware = (req, res, next) => {
    console.log('Middleware triggered CACA');
    next();
}