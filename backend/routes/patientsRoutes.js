import express from 'express';
const router = express.Router();
import { getPatientInfo, getAllPatients, createPatient } from '../controllers/patientsController.js';

router.get('/:id', getPatientInfo); // Get specific patient by ID
router.get('/', getAllPatients); // Get all patients
router.post('/', createPatient); // Create new patient

export default router;
