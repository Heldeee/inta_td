const express = require('express');
const router = express.Router();
const { getMedicalRecordsByPatientId } = require('../controllers/medicalRecordsController');

router.get('/:patientId', getMedicalRecordsByPatientId); // Get medical records for a patient

module.exports = router;
