import express from 'express';
const router = express.Router();
import { getDeviceDataByPatientId, addMedicalDevice, getAllDevices } from '../controllers/devicesController.js';

router.get('/', getAllDevices);
router.get('/:patientId', getDeviceDataByPatientId); // Get device data for a patient
router.post('/', addMedicalDevice);
export default router;
