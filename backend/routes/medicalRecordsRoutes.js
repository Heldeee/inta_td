import express from 'express';
const router = express.Router();
import { getMedicalRecordsByPatientId } from '../controllers/medicalRecordsController.js'

router.get('/:patientId', getMedicalRecordsByPatientId); // Get medical records for a patient

export default router;
