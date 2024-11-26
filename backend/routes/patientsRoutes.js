import express from 'express';
const router = express.Router();
import {
    getPatientInfo,
    getAllPatients,
    createPatient,
    getPatientsByDoctor,
    getPatientByKeycloakId,
    sendPatientToFhir,
    printMiddleware
} from '../controllers/patientsController.js';

router.post('/transfer', printMiddleware, sendPatientToFhir); // Send patient data to FHIR server
router.get('/keycloak/:keycloakId', getPatientByKeycloakId); // Get patient by keycloak ID
router.get('/doctor/:doctorId', getPatientsByDoctor); // Get all patients by doctor ID
router.get('/:id', getPatientInfo); // Get specific patient by ID
router.get('/', getAllPatients); // Get all patients
router.post('/', createPatient); // Create new patient

export default router;