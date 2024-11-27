import express from 'express';
const router = express.Router();
import { getDeviceDataByPatientId, addMedicalDevice, getAllDevices } from '../controllers/devicesController.js';

router.get('/:patientId', getDeviceDataByPatientId);
router.get('/', getAllDevices);
router.post('/', addMedicalDevice);
export default router;
