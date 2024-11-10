import express from 'express';
const router = express.Router();
import { getPatientInfo, getAllPatients } from '../controllers/patientsController.js';

router.get('/:id', getPatientInfo); // Get specific patient by ID
router.get('/', getAllPatients); // Get all patients

export default router;
