import express from 'express';
const router = express.Router();
import { getMedicalRecordsByPatientIdNos, createMedicalRecord } from '../controllers/medicalRecordsController.js';

// Get medical records for a patient by idNos
router.get('/:idNos', getMedicalRecordsByPatientIdNos);

// Create a new medical record for a patient
router.post('/', createMedicalRecord);

export default router;
