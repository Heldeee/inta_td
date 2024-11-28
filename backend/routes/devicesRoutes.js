import express from 'express';
const router = express.Router();
import { getDeviceDataById, addMedicalDevice, getAllDevices, getDeviceRecordsById } from '../controllers/devicesController.js';

router.get('/:deviceId', getDeviceDataById);
router.get('/:deviceId/records', getDeviceRecordsById);
router.get('/', getAllDevices);
router.post('/', addMedicalDevice);
export default router;