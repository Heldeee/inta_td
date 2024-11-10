import express from 'express';
const router = express.Router();
import { getDeviceDataByPatientId } from '../controllers/devicesController.js';

router.get('/:patientId', getDeviceDataByPatientId); // Get device data for a patient

export default router;
