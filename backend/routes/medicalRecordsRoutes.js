import express from 'express';
const router = express.Router();
import { getMedicalRecordsByDeviceId, createMedicalRecord, getAllMedicalRecords } from '../controllers/medicalRecordsController.js';

router.get('/:id', getMedicalRecordsByDeviceId);
router.get('/', getAllMedicalRecords);
router.post('/', createMedicalRecord);

export default router;
