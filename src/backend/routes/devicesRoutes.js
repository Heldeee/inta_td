const express = require('express');
const router = express.Router();
const { getDeviceDataByPatientId } = require('../controllers/devicesController');

router.get('/:patientId', getDeviceDataByPatientId); // Get device data for a patient

module.exports = router;
