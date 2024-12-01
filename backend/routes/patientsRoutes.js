import express from 'express';
const router = express.Router();
import {
    getPatientInfo,
    getAllPatients,
    createPatient,
    getPatientsByDoctor,
    sendPatientToFhir,
    printMiddleware,
    updatePatient
} from '../controllers/patientsController.js';

router.post('/transfer', printMiddleware, sendPatientToFhir); // Send patient data to FHIR server
router.get('/doctor/:doctorId', getPatientsByDoctor); // Get all patients by doctor ID
router.get('/:id', getPatientInfo); // Get specific patient by ID
router.get('/', getAllPatients); // Get all patients
router.post('/', createPatient); // Create new patient
router.put('/:id', updatePatient); // Update patient

export default router;