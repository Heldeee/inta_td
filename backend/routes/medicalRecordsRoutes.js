import express from 'express';
const router = express.Router();
import {
    getMedicalRecordsByDeviceId,
    getMedicalRecordById,
    createMedicalRecord,
    getAllMedicalRecords
} from '../controllers/medicalRecordsController.js';

router.get('/:id', getMedicalRecordById);
router.get('/', getAllMedicalRecords);
router.post('/', createMedicalRecord);

export default router;
